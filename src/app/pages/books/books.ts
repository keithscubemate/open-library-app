import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OpenLibrary } from '../../services/openlibrary';
import { Author, Book } from '../../models/openlibrary';
import { finalize, map, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-books',
  imports: [RouterLink],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  private route = inject(ActivatedRoute);
  private openlibrary = inject(OpenLibrary);
  private destroyRef = inject(DestroyRef);

  loading = signal(false);
  error = signal(null);
  book = signal<Book | null>(null);
  author = signal<Author | null>(null);

  authorUrl = computed(() => this.author()?.key)

  jerror = computed(() => JSON.stringify(this.error(), null, 2));

  book_id = "";

  constructor() {
    this.book_id = this.route.snapshot.params['id'];
    this.getBook(this.book_id)
  }

  getBook(book_id: string) {
    if (book_id == "") {
      alert("bad book id");
      return;
    }

    this.loading.set(true)

    this.openlibrary.getBook(book_id)
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
        switchMap((book) => {
          const author_id = book.authors[0].author.key.replace("/authors/", "");

          return this.openlibrary.getAuthor(author_id).pipe(
            map((author) => ({ author, book }))
          )
        })
      )
      .subscribe({
        next: (res) => {
          this.book.set(res.book)
          this.author.set(res.author)
        },
        error: (err) => this.error.set(err),
      })
  }
}
