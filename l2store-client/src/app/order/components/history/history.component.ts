import { Title } from '@angular/platform-browser';
import { HttpParams } from '@angular/common/http';
import { OrderService } from './../../services/order.service';
import { OrderOverview } from 'src/app/order/models/order-overview';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  page = 1;
  limited = 8;
  totalPage = 0;

  loading = false;

  orders: OrderOverview[] = [];
  constructor(private orderService: OrderService, private titleService: Title) {
    this.titleService.setTitle('L2 | History');
  }

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory() {
    this.loading = true;
    const params = new HttpParams()
      .set('page', this.page)
      .set('limited', this.limited)
      .set('sortTar', 'paymentTime')
      .set('sortDir', 'desc');
    this.orderService.getHistory(params).subscribe({
      next: (res) => {
        this.orders = [...this.orders, ...res.content];
        this.totalPage = res.totalPages;
        this.page++;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
    });
  }

  handleScroll(e: any) {
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;

    if (this.loading == false && this.page <= this.totalPage) {
      if (scrollHeight - (scrollTop + clientHeight) < 150) {
        this.getHistory();
      }
    }
  }
}
