import { FormControl } from '@angular/forms';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() id!: any;
  @Input() data!: any[];
  @Input() time: string = '';
  @Input() title: string = '';

  keys: any[] = [];
  dataSet!: any[];
  chart!: any;
  ngOnChanges(changes: SimpleChanges): void {
    this.keys = [];
    this.dataSet = this.groupBy(this.time);
    if (this.dataSet) {
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(this.id, {
        type: 'bar',
        data: {
          labels: this.keys.map((row) => row),
          datasets: [
            {
              label: `${
                this.title.charAt(0).toUpperCase() + this.title.slice(1)
              } by ${this.time}`,
              data: Object.values(this.dataSet).map((row) => row),
              backgroundColor: 'rgba(#000,.5)',
            },
          ],
        },
      });
    }
  }

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {}

  dateNow(): string {
    return new Date().toISOString();
  }

  groupBy(by: string) {
    if (!this.data) {
      return;
    }
    var groupBy = this.data.reduce((group, item) => {
      const key = this.convertKey(by, item.key);
      if (group[key]) {
        group[key] = group[key];
      } else {
        group[key] = 0;
        this.keys = [...this.keys, key];
      }
      group[key] += Number(item.value);
      return group;
    }, {});
    return groupBy;
  }
  convertKey(by: string, key: any): string {
    const date = new Date(key);
    switch (by) {
      case 'month':
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
      case 'quarter':
        return `${Math.floor(date.getMonth() / 3) + 1}/${date.getFullYear()}`;
      case 'year':
        return `${date.getFullYear()}`;
      default:
        return '';
    }
  }
}
