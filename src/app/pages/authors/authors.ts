import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenLibrary } from '../../services/openlibrary';
import { Author, Book } from '../../models/openlibrary';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, switchMap, tap } from 'rxjs';
import { WorkCard } from '../../components/work-card/work-card';

@Component({
  selector: 'app-authors',
  imports: [WorkCard],
  templateUrl: './authors.html',
  styleUrl: './authors.css',
})
export class Authors {
  private route = inject(ActivatedRoute);
  private openlibrary = inject(OpenLibrary);
  private destroyRef = inject(DestroyRef);

  loading = signal(false);
  error = signal(null);
  author = signal<Author | null>(null);
  works = signal<Book[] | null>(null)

  jerror = computed(() => JSON.stringify(this.error(), null, 2));

  author_id = "";

  constructor() {
    this.author_id = this.route.snapshot.params['id'];
    this.getAuthor(this.author_id);
  }

  getAuthor(author_id: string) {
    if (author_id == "") {
      alert("bad author id");
      return;
    }

    this.loading.set(true)

    this.openlibrary.getAuthor(author_id)
      .pipe(
        tap((author) => {
          this.author.set(author)
          this.loading.set(false)
        }),
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.openlibrary.getAuthorWorks(author_id)),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (res) => this.works.set(res.entries),
        error: (err) => this.error.set(err),
      })
  }
}
