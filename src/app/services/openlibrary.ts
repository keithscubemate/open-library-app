import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResponse, Book, Author } from '../models/openlibrary';

const BASE_URL = "https://openlibrary.org"

@Injectable({
  providedIn: 'root',
})
export class OpenLibrary {
  private http = inject(HttpClient);

  search(query: string, page: number): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(
      `${BASE_URL}/search.json`,
      {
        params: {
          q: query,
          page: page,
          limit: 10,
        },
      }
    )
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${BASE_URL}/works/${id}.json`)
  }

  getAuthor(id: string): Observable<Author> {
    return this.http.get<Author>(`${BASE_URL}/authors/${id}.json`)
  }
}
