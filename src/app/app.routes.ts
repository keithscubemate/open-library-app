import { Routes } from '@angular/router';
import { Search } from './pages/search/search';

export const routes: Routes = [
  {
    path: '',
    component: Search,
    title: "Search"
  },
  {
    path: 'search/',
    component: Search,
    title: "Search"
  },
  {
    path: 'books/:id',
    loadComponent: () => import('./pages/books/books').then(m => m.Books),
    title: "Books"
  },
  {
    path: 'authors/:id',
    loadComponent: () => import('./pages/authors/authors').then(m => m.Authors),
    title: "Authors"
  },
];
