import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { Errors } from 'src/app/core/interface/error.iterface';
import { ListErrorsComponent } from '../../../lists-errors/list-errors.component';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    NgIf,
    ReactiveFormsModule,
    ListErrorsComponent,
  ],
  standalone: true,
})
export class ModifyComponent implements OnInit, OnDestroy {
  modifyType: string = '';
  title: string = '';

  modifyForm: FormGroup;
  isSubmitting: boolean = false;
  errors: Errors = { errors: {} };
  destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute) {
    this.modifyForm = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      description: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      // languages: new FormControl(['']),
    });
  }
  ngOnInit(): void {
    this.modifyType = this.route.snapshot.url.at(-1)!.path;
    console.log(this.modifyType);
    this.title = this.modifyType === 'edit' ? 'Edit' : 'Create';
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
    this.isSubmitting = true;
    this.errors = { errors: {} };
  }
}
