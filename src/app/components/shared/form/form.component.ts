import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [ReactiveFormsModule, FormsModule],
  standalone: true,
})
export class FormComponent {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });
  onSubmit() {
    this.formSubmit.emit(this.profileForm.value);
  }
}
