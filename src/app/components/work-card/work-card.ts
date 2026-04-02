import { Component, computed, input } from '@angular/core';
import { Book } from '../../models/openlibrary';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-work-card',
  imports: [RouterLink],
  templateUrl: './work-card.html',
  styleUrl: './work-card.css',
})
export class WorkCard {
  book = input.required<Book>();
  bookUrl = computed(() => `/books/${this.book().key.replace("/works/", "")}`)
}
