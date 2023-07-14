import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ITable } from '../table/table.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  imports: [NgChartsModule],
  standalone: true,
})
export class ChartComponent implements AfterViewInit, OnInit {
  @Input() data: ITable[];
  @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;
  chart: Chart;
  constructor() {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.createChart();
  }
  createChart() {
    this.chart = new Chart(
      this.canvasRef.nativeElement.getContext('2d') as CanvasRenderingContext2D,
      {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Great',
              data: this.data.map((point) => ({ x: point.x, y: point.y })),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
          labels: this.data.map((point) => point.x.toString()),
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'linear',
              display: true,
              position: 'bottom',
            },
            y: {
              display: true,
            },
          },
        },
      }
    );
  }
}
