import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books',
  imports: [],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  private route = inject(ActivatedRoute);

  book_id = "no id";

  constructor() {
    this.book_id = this.route.snapshot.params['id'];
  }
}
