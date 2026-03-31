import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private router = inject(Router);

  form = new FormGroup({
    boa: new FormControl('book'),
    control: new FormControl('', Validators.required)
  });


  onSubmit() {
    const boa = this.form.value.boa
    const query = this.form.value.control

    const root = boa == "book" ? '/books' : '/authors';

    this.router.navigate([root, query]);
  }
}
