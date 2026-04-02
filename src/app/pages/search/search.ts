import { Component, inject, signal, effect, computed, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenLibrary } from '../../services/openlibrary';
import { finalize } from 'rxjs';
import { SearchResponse } from '../../models/openlibrary';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BookCard } from '../../components/book-card/book-card';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, BookCard],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private router = inject(Router);
  private openlibrary = inject(OpenLibrary);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  params = toSignal(this.route.queryParams)

  search = computed(() => this.params()?.['q'])
  page = computed(() => +(this.params()?.['page'] ?? 1))

  books = signal<SearchResponse | null>(null)
  loading = signal(false)
  error = signal(null)
  jerror = computed(() => JSON.stringify(this.error(), null, 2))

  constructor() {
    effect(() => {
      if (!this.search()) {
        this.books.set(null)
        return
      }

      this.runSearch(this.search(), this.page())
    })
  }

  form = new FormGroup({
    control: new FormControl('', Validators.required)
  });

  runSearch(query: string, page: number) {
    if (query == "") {
      return;
    }

    this.error.set(null)
    this.loading.set(true)

    this.openlibrary.search(query, page)
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (res) => this.books.set(res),
        error: (err) => this.error.set(err),
      })
  }

  updatePage(amount: number) {
    const page = Number(this.page())

    const new_page = (page > 1) ? page + amount : 1

    this.router.navigate(
      ['/'],
      {
        queryParams: {
          q: this.search(),
          page: new_page,
        }
      }
    );
  }

  onSubmit() {
    const query = this.form.value.control
    this.router.navigate(['/'], { queryParams: { q: query, page: 1 } });
  }
}
