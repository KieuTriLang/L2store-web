import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from './../../../../order/services/order.service';
import { OrderDetail } from './../../../../order/models/order-detail';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderDetail!: OrderDetail;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const type = params['type'];
      if (type != 'info') {
        this.router.navigate(['/admin/order']);
      }
    });
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id && id != null) {
        this.getData(id);
      }
    });
  }

  getData(id: any) {
    this.orderService.getById(id).subscribe({
      next: (res) => {
        this.orderDetail = res;
      },
    });
  }
}
