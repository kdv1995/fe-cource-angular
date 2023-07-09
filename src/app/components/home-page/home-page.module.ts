import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TabComponent } from '../tab/tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TableComponent } from '../table/table.component';
import { MatTableModule } from '@angular/material/table';
import { ChartComponent } from '../chart/chart.component';
import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Home page' },
];
@NgModule({
  declarations: [
    HomePageComponent,
    TabComponent,
    TableComponent,
    ChartComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
  ],
  exports: [RouterModule],
})
export class HomePageModule {}
