import { Routes } from '@angular/router';
import { Search } from './pages/search/search';
import { Authors } from './pages/authors/authors';
import { Books } from './pages/books/books';

export const routes: Routes = [
  {
    path: '',
    component: Search,
    title: "Search"
  },
  {
    path: 'books/:id',
    component: Books,
    title: "Books"
  },
  {
    path: 'authors/:id',
    component: Authors,
    title: "Authors"
  },
];
