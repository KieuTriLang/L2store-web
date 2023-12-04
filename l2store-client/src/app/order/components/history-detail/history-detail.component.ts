import { OrderDetail } from './../../models/order-detail';
import { OrderService } from './../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss'],
})
export class HistoryDetailComponent implements OnInit {
  id: any;

  orderDetail!: OrderDetail;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';
      this.orderService.getById(this.id).subscribe({
        next: (res) => {
          this.orderDetail = res;
        },
        error: (err) => {
          if (!this.orderDetail) {
            this.router.navigate(['/history']);
          }
        },
      });
    });
  }
}
