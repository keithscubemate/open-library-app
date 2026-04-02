import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { SearchResponse, Book, Author } from '../models/openlibrary';

const BASE_URL = "https://openlibrary.org"

@Injectable({
  providedIn: 'root',
})
export class OpenLibrary {
  private http = inject(HttpClient);
  private cache = new Map<string, SearchResponse>();

  search(query: string, page: number): Observable<SearchResponse> {
    const key = `${query}:${page}`;

    if (this.cache.has(key)) {
      return of(this.cache.get(key)!);
    }

    const resp = this.http.get<SearchResponse>(
      `${BASE_URL}/search.json`,
      {
        params: {
          q: query,
          page: page,
          limit: 12,
        },
      }
    ).pipe(
      tap((res) => this.cache.set(key, res))
    )


    return resp
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${BASE_URL}/works/${id}.json`)
  }

  getAuthor(id: string): Observable<Author> {
    return this.http.get<Author>(`${BASE_URL}/authors/${id}.json`)
  }
}
