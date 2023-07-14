import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  standalone: true,
})
export class TabComponent {
  @Input() tab: any;
}
