import { Component, Input, SimpleChanges } from '@angular/core';
import { ITable } from './table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() data!: ITable[];
  displayedColumns: string[] = ['x', 'y'];
  dataSource = this.data;
  ngOnChanges(): void {
    this.dataSource = this.data;
  }
}
