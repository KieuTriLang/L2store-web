import { UserService } from './../../../user/services/user.service';
import { OrderService } from './../../../order/services/order.service';
import { Component, OnInit } from '@angular/core';
import { faCoins, faCube, faCubes } from '@fortawesome/free-solid-svg-icons';
import { Chart, registerables } from 'chart.js';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  timeIndexSelected = 0;
  time: string[] = ['month', 'quarter', 'year'];
  opened = false;
  from = new FormControl();
  to = new FormControl();

  cubeIcon = faCube;
  cubesIcon = faCubes;
  moneyIcon = faCoins;
  totalUser = 0;

  productData!: any[];
  collectionData!: any[];
  turnoverData!: any[];

  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {
    this.orderService.getDataOrderStatistic().subscribe((data) => {
      this.productData = data.productStatistic;
      this.collectionData = data.comboStatistic;
      this.turnoverData = data.turnoverStatistic;
    });
    this.userService
      .getTotalUser()
      .subscribe((data) => (this.totalUser = data));
  }

  ngOnInit(): void {}
}
