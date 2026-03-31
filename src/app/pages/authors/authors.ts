import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authors',
  imports: [],
  templateUrl: './authors.html',
  styleUrl: './authors.css',
})
export class Authors {
  private route = inject(ActivatedRoute);

  author_id = "no id";

  constructor() {
    this.author_id = this.route.snapshot.params['id'];
  }
}
