import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OpenLibrary } from '../../services/openlibrary';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private router = inject(Router);
  private openlibrary = inject(OpenLibrary);

  form = new FormGroup({
    boa: new FormControl('book'),
    control: new FormControl('', Validators.required)
  });

  books = toSignal(
    this.openlibrary.search("dune", 1),
    { initialValue: null }
  );

  onSubmit() {
    const boa = this.form.value.boa
    const query = this.form.value.control

    const root = boa == "book" ? '/books' : '/authors';

    this.router.navigate([root, query]);
  }
}
