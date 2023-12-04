import { Title } from '@angular/platform-browser';
import { CartService } from './../../../order/services/cart.service';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { OrderService } from './../../../order/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-payment',
  templateUrl: './review-payment.component.html',
  styleUrls: ['./review-payment.component.scss'],
})
export class ReviewPaymentComponent implements OnInit, OnDestroy {
  checkIcon = faCheck;
  loading = false;
  loadIcon = faSpinner;
  reviewPayment: any;
  paymentId!: string;
  payerId!: string;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('L2 | Review payment');
  }
  ngOnDestroy(): void {
    if (this.orderService.tokentOrder) {
      this.orderService.cancelPayment(this.orderService.tokentOrder).subscribe({
        next: (res) => {},
        error: (err) => {},
      });
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.paymentId = params['paymentId'];
      this.payerId = params['PayerID'];
      this.orderService.tokentOrder = params['token'] || '';
      this.getReviewPayment();
    });
  }

  getReviewPayment() {
    this.orderService.reviewPayment(this.paymentId, this.payerId).subscribe({
      next: (res) => {
        this.reviewPayment = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  cancel() {
    if (this.orderService.tokentOrder) {
      this.orderService.cancelPayment(this.orderService.tokentOrder).subscribe({
        next: (res) => {
          this.router.navigate(['/my-cart']);
        },
        error: (err) => {},
      });
    }
  }
  excutePayment() {
    if (this.paymentId.length > 0 && this.payerId.length > 0 && !this.loading) {
      this.loading = true;
      this.orderService.excutePayment(this.paymentId, this.payerId).subscribe({
        next: (res) => {
          console.log(res);
          this.loading = false;
          this.cartService.resetCart();
          this.router.navigate(['/my-cart/payment-success']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
