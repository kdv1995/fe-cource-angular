import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  standalone: true,
  imports: [MatProgressSpinnerModule, NgIf],
})
export class SpinnerComponent {
  public color: ThemePalette = 'primary';
  constructor(public readonly loadingService: LoadingService) {}
}
