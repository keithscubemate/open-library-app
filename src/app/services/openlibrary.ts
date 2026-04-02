import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { SearchResponse, Book, Author, WorksResponse } from '../models/openlibrary';

const BASE_URL = "https://openlibrary.org"

@Injectable({
  providedIn: 'root',
})
export class OpenLibrary {
  private http = inject(HttpClient);
  private searchCache = new Map<string, SearchResponse>();
  private bookCache = new Map<string, Book>();
  private authorCache = new Map<string, Author>();
  private authorWorkCache = new Map<string, WorksResponse>();

  search(query: string, page: number): Observable<SearchResponse> {
    const key = `${query}:${page}`;
    if (this.searchCache.has(key)) return of(this.searchCache.get(key)!);

    return this.http.get<SearchResponse>(`${BASE_URL}/search.json`, {
      params: { q: query, page: page, limit: 12 },
    }).pipe(tap(res => this.searchCache.set(key, res)));
  }

  getBook(id: string): Observable<Book> {
    if (this.bookCache.has(id)) return of(this.bookCache.get(id)!);

    return this.http.get<Book>(`${BASE_URL}/works/${id}.json`)
      .pipe(tap(res => this.bookCache.set(id, res)));
  }

  getAuthor(id: string): Observable<Author> {
    if (this.authorCache.has(id)) return of(this.authorCache.get(id)!);

    return this.http.get<Author>(`${BASE_URL}/authors/${id}.json`)
      .pipe(tap(res => this.authorCache.set(id, res)));
  }

  getAuthorWorks(id: string): Observable<WorksResponse> {
    if (this.authorWorkCache.has(id)) return of(this.authorWorkCache.get(id)!);

    return this.http.get<WorksResponse>(`${BASE_URL}/authors/${id}/works.json`)
      .pipe(tap(res => this.authorWorkCache.set(id, res)));
  }
}

