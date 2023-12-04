import { NotificationService } from './../../../../shared/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from './../../../../order/services/order.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { OrderOverview } from 'src/app/order/models/order-overview';
import { HttpParams } from '@angular/common/http';
import { SortItem } from 'src/app/shared/models/sort-item';

@Component({
  selector: 'app-table-order',
  templateUrl: './table-order.component.html',
  styleUrls: ['./table-order.component.scss'],
})
export class TableOrderComponent implements OnInit {
  orderStateListIndex = -1;
  checkIcon = faCheck;

  page: number = 1;
  limited: number = 8;
  totalPage: number = 0;

  orders: OrderOverview[] = [];

  orderStates: string[] = [];

  sortTar: string = 'total';
  sortDir: string = 'desc';
  sortList: SortItem[] = [
    {
      name: 'Highest value',
      sortTar: 'total',
      sortDir: 'desc',
    },
    {
      name: 'Payment time',
      sortTar: 'paymentTime',
      sortDir: 'desc',
    },
    // {
    //   name: 'Order state',
    //   sortTar: 'orderState',
    //   sortDir: 'desc',
    // },
  ];
  constructor(
    private orderService: OrderService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllOrderState();
    this.orderService.requestState$.subscribe((state) => {
      if (state) {
        this.getByPage();
      }
    });
    this.route.queryParams.subscribe((params) => {
      this.page = params['page'] || 1;
      this.getByPage();
    });
  }

  getByPage() {
    const params = new HttpParams()
      .set('page', this.page)
      .set('limited', this.limited)
      .set('sortTar', this.sortTar)
      .set('sortDir', this.sortDir);
    this.orderService.getAll(params).subscribe((res) => {
      this.page = res.pageable.pageNumber + 1;
      this.orders = res.content;
      this.totalPage = res.totalPages;
    });
  }

  handlePageChange(page: number) {
    this.page = page;
    this.getByPage();
  }

  getAllOrderState() {
    this.orderService.getOrderState().subscribe({
      next: (res) => {
        this.orderStates = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleOrderStateList(i: number) {
    if (this.orderStateListIndex == i) {
      this.orderStateListIndex = -1;
    } else {
      this.orderStateListIndex = i;
    }
  }

  changeOrderState(orderCode: string, state: string) {
    this.orderService.updateOrderState(orderCode, state).subscribe({
      next: (res) => {
        this.notificationService.addNewNoti({
          type: 'info',
          title: 'Order',
          message: `${orderCode} change order state successfully!`,
        });

        this.orders = this.orders.map((order) =>
          order.orderCode == orderCode ? { ...order, orderState: state } : order
        );
        this.orderStateListIndex = -1;
      },
    });
  }
  handleSort(value: SortItem) {
    this.sortTar = value.sortTar;
    this.sortDir = value.sortDir;
    this.page = 1;
    this.orders = [];
    this.getByPage();
  }
}
