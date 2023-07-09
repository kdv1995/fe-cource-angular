import { Component, OnInit } from '@angular/core';
import { ITable } from '../table/table.interface';
import { HomepageService } from './homepage.service';
import { ITab } from '../tab/tab.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  tableDataOne: ITable[] = [];
  tableDataTwo: ITable[] = [];
  tableData: ITab[] = [];

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
