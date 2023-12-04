import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
})
export class OrderSuccessComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('L2 | Payment successfully');
  }

  ngOnInit(): void {}
}
