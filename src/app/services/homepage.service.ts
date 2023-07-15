import { Injectable } from '@angular/core';
import { ITable } from '../components/table/table.interface';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  //*
  //generateTableDataWithStep
  //
  public generateTableDataWithStep(step: number, table: ITable[]): ITable[] {
    for (; step <= 10; step++) {
      const row: ITable = {
        x: Math.floor(Math.random() * 10) + 1,
        y: Math.floor(Math.random() * 10) + 1,
      };
      table.push(row);
    }
    return table;
  }
}
