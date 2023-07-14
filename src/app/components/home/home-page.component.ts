import { Component, OnInit } from '@angular/core';
import { ITable } from '../table/table.interface';
import { ITab } from '../tab/tab.interface';
import { HomepageService } from 'src/app/services/homepage.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TableComponent } from '../table/table.component';
import { MatTableModule } from '@angular/material/table';
import { NgFor } from '@angular/common';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  imports: [
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    TableComponent,
    NgFor,
    ChartComponent,
  ],
  standalone: true,
})
export class HomePageComponent implements OnInit {
  tableDataOne: ITable[] = [];
  tableDataTwo: ITable[] = [];
  tableData: ITab[] = [];
  isAuthenticated = false;

  constructor(private homeService: HomepageService) {}

  ngOnInit(): void {
    this.tableDataOne = this.homeService.generateTableDataWithStep(1, []);
    this.tableDataTwo = this.homeService.generateTableDataWithStep(2, []);

    this.tableData = [
      { id: Math.random(), title: 'Table one', data: this.tableDataOne },
      { id: Math.random(), title: 'Table two', data: this.tableDataTwo },
    ];
  }
}
