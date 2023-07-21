//Core
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

//Form
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

//Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

//Route
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LanguagesService } from 'src/app/services/languages.service';
import { IPost } from '../post.interface';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css'],
  imports: [
    TitleCasePipe,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    NgIf,
    ReactiveFormsModule,
    MatSelectModule,
    NgFor,
    MatTabsModule,
  ],
  standalone: true,
})
export class ModifyComponent implements OnInit, OnDestroy {
  post: IPost;

  modifyForm: FormArray | FormGroup;
  modifyType: string = '';
  isSubmitting: boolean = false;

  title: string = this.route?.snapshot?.routeConfig?.path?.includes('edit')
    ? 'Edit'
    : 'Create';
  currentUrl = this.route.snapshot?.routeConfig?.path?.split('/')[0];

  destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public languageService: LanguagesService
  ) {
    this.post = history.state.post;
  }

  ngOnInit(): void {
    this.createForm();
  }

  initMultiLanguageDataArray(language: string, value: string): FormGroup {
    return this.formBuilder.group({
      language: new FormControl(language),
      translation: new FormControl(value),
    });
  }
  createForm() {
    if (this.currentUrl === 'edit') {
      this.modifyForm = this.formBuilder.group({
        title: this.formBuilder.group({}),
        content: this.formBuilder.group({}),
      });

      for (const lang of this.post.title) {
        (this.modifyForm?.get('title') as FormGroup).addControl(
          lang.language,
          this.formBuilder.control(lang.value)
        );
      }
      for (const lang of this.post.content) {
        (this.modifyForm?.get('content') as FormGroup).addControl(
          lang.language,
          this.formBuilder.control(lang.value)
        );
      }
    } else {
      this.modifyForm = this.formBuilder.array([
        this.formBuilder.group({
          locale: this.formBuilder.control('eng'),
          title: this.formBuilder.array([
            this.initMultiLanguageDataArray('', ''),
          ]),
          content: this.formBuilder.array([
            this.initMultiLanguageDataArray('', ''),
          ]),
        }),
        this.formBuilder.group({
          locale: this.formBuilder.control('pt'),
          title: this.formBuilder.array([
            this.initMultiLanguageDataArray('', ''),
          ]),
          content: this.formBuilder.array([
            this.initMultiLanguageDataArray('', ''),
          ]),
        }),
      ]);
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
    this.isSubmitting = true;
    this.modifyForm.reset();
  }
}
