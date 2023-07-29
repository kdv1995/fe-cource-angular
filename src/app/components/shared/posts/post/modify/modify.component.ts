//Core
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

//Form
import {
  FormArray,
  FormBuilder,
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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Errors } from 'src/app/core/interface/error.iterface';

//Services
import { PostsService } from 'src/app/services/posts.service';
import { LanguagesService } from 'src/app/services/languages.service';

//Interface
import {
  IPostEditRequest,
  IPostCreateRequest,
  IPostFiltered,
} from '../post.interface';

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
  post: IPostFiltered;

  modifyForm: FormArray | FormGroup;
  modifyType: string = '';
  isSubmitting: boolean = false;

  title: string = this.route?.snapshot?.routeConfig?.path?.includes('edit')
    ? 'Edit'
    : 'Create';
  currentUrl = this.route.snapshot?.routeConfig?.path?.split('/')[0];

  destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public languageService: LanguagesService,
    private postsService: PostsService
  ) {
    this.post = history.state.post;
  }

  ngOnInit(): void {
    this.createForm();
  }

  initMultiLanguageDataArray(language: string, value: string): FormGroup {
    return this.formBuilder.group({
      language: this.formBuilder.control(language),
      translation: this.formBuilder.control(value),
    });
  }
  createForm() {
    if (this.currentUrl === 'edit') {
      this.modifyForm = this.formBuilder.group({
        id: this.post._id,
        title: this.formBuilder.group({
          language: this.post.title.language,
          translation: this.post.title.translation,
        }),
        content: this.formBuilder.group({
          language: this.post.content.language,
          translation: this.post.content.translation,
        }),
      });
    } else {
      this.modifyForm = this.formBuilder.array([
        this.formBuilder.group({
          locale: this.formBuilder.control('en'),
          title: this.formBuilder.array([
            this.initMultiLanguageDataArray('en', ''),
          ]),
          content: this.formBuilder.array([
            this.initMultiLanguageDataArray('en', ''),
          ]),
        }),
        this.formBuilder.group({
          locale: this.formBuilder.control('uk'),
          title: this.formBuilder.array([
            this.initMultiLanguageDataArray('uk', ''),
          ]),
          content: this.formBuilder.array([
            this.initMultiLanguageDataArray('uk', ''),
          ]),
        }),
      ]);
    }
    console.log(this.modifyForm.value);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    this.isSubmitting = true;

    let observable =
      this.currentUrl === 'edit'
        ? this.postsService.editPost(this.modifyForm.value as IPostEditRequest)
        : this.postsService.addPost(
            this.modifyForm.value as IPostCreateRequest[]
          );
    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.router.navigate(['/posts']);
      },
      error: (err: Errors) => {
        this.isSubmitting = false;
      },
    });
    this.modifyForm.reset();
    this.isSubmitting = false;
  }
}
