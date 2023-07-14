//Directives
import { NgFor, NgIf } from '@angular/common';

//Core
import { Component, Input } from '@angular/core';

//Interfaces
import { Errors } from 'src/app/core/interface/error.iterface';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css'],
  imports: [NgIf, NgFor],
  standalone: true,
})
export class ListErrorsComponent {
  errorsList: string[];

  @Input() set errors(errorList: Errors | null) {
    this.errorsList = errorList
      ? Object.keys(errorList.errors || {}).map(
          (key) => `${key} ${errorList.errors[key]}`
        )
      : [];
  }
}
