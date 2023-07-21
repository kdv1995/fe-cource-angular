import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { mimeType } from './mime-type.validators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    MatAutocompleteModule,
  ],
  standalone: true,
})
export class FormComponent implements OnInit {
  imagePreview: string | null | ArrayBuffer;

  profileForm: FormGroup;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      }),
      lastName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        // asyncValidators: [mimeType],
      }),
    });
  }
  constructor() {}
  onSubmit() {
    this.formSubmit.emit(this.profileForm.value);
  }
  onImagePicked(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files?.length) return;

    const file: File = fileInput.files[0];
    this.profileForm.patchValue({
      image: file,
    });
    this.profileForm.get('image')?.updateValueAndValidity();
    const fileReader: FileReader = new FileReader();
    fileReader.onload = () => {
      this.imagePreview = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  }
}
