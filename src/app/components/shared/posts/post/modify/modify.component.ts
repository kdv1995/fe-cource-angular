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
import { IPost } from '../post.interface';

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
  post: IPost;
  modifyType: string = '';
  title: string = '';

  modifyForm: FormGroup;
  isSubmitting: boolean = false;
  errors: Errors = { errors: {} };
  destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute) {
    this.post = history.state.post;
    this.title = this.route?.snapshot?.routeConfig?.path?.includes('edit')
      ? 'Edit'
      : 'Create';
  }
  ngOnInit(): void {
    if (this.route.snapshot?.routeConfig?.path?.includes('edit')) {
      this.modifyForm = new FormGroup({
        title: new FormControl(this.post.title[0].language, {
          validators: [Validators.required],
        }),
        description: new FormControl(this.post.content[0].language, {
          validators: [Validators.required],
        }),
        // language: new FormControl(this.post.content),
      });
    } else {
      this.modifyForm = new FormGroup({
        title: new FormControl('', {
          validators: [Validators.required],
        }),
        description: new FormControl('', {
          validators: [Validators.required],
        }),
      });
    }
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

function ngOnDestroy() {
  throw new Error('Function not implemented.');
}
