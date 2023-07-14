import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ITable } from './table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [MatTableModule],
  standalone: true,
})
export class TableComponent {
  @Input() data!: ITable[];
  displayedColumns: string[] = ['x', 'y'];
  dataSource: MatTableDataSource<ITable>;
  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }
}
