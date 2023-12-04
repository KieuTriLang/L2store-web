import { Component, Input, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  timeIndexSelected = 0;
  time: string[] = ['m', 'q', 'y'];
  @Input() data!: any[];
  @Input() icon: any = faUser;
  @Input() name: string = 'Visitors';
  @Input() value!: number;
  @Input() currency: boolean = false;

  month!: any[];
  quarter!: any[];
  year!: any[];

  constructor() {}

  ngOnInit(): void {}

  dateNow(): string {
    return new Date().toISOString();
  }
  changeTimeIndexSelected() {
    this.timeIndexSelected =
      this.timeIndexSelected == this.time.length - 1
        ? 0
        : this.timeIndexSelected + 1;
  }

  groupBy(by: string) {
    if (!this.data) {
      return;
    }
    var groupBy = this.data.reduce((group, item) => {
      const key = this.convertKey(by, item.key);
      group[key] = group[key] ?? 0;
      group[key] += Number(item.value);
      return group;
    }, {});
    return groupBy;
  }
  convertKey(by: string, key: any): string {
    const date = new Date(key);
    switch (by) {
      case 'm':
        return `month ${date.getMonth() + 1}/${date.getFullYear()}`;
      case 'q':
        return `quarter ${
          Math.floor(date.getMonth() / 3) + 1
        }/${date.getFullYear()}`;
      case 'y':
        return `year ${date.getFullYear()}`;
      default:
        return '';
    }
  }
}
