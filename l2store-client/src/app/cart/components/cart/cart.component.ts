import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from './../../../order/services/order.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartService } from './../../../order/services/cart.service';
import { Cart } from './../../../order/models/cart';
import { Component, OnInit } from '@angular/core';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faMoneyBill, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  redirecting = false;
  paypalIcon = faPaypal;
  // momoIcon = faPaypal;
  cashIcon = faMoneyBill;
  loading = false;
  loadIcon = faSpinner;
  cart!: Cart;

  form!: FormGroup;
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.titleService.setTitle('L2 | Cart');
    this.form = this.fb.group({
      something: '',
    });
  }

  ngOnInit(): void {
    this.cartService.cartUpdate$.subscribe({
      next: (value) => {
        this.cart = this.cartService.getAllItem();
      },
    });
    this.cart = this.cartService.getAllItem();

    if (
      !this.route.snapshot.queryParams['paymentId'] &&
      !this.route.snapshot.queryParams['PayerID']
    ) {
      const token = this.route.snapshot.queryParams['token'];
      if (token) {
        this.orderService.cancelPayment(token).subscribe({
          next: (res) => {},
          error: (err) => {},
        });
      }
    }
  }

  calculateTotal(): number {
    const sumProducts = this.cart.products.reduce(
      (sum, current) => sum + current.price * current.quantity,
      0
    );
    const sumCombos = this.cart.combos.reduce(
      (sum, current) => sum + current.price * current.quantity,
      0
    );
    return sumCombos + sumProducts;
  }
  clear() {
    this.cartService.resetCart();
  }
  submit() {
//     alert("This feature has been closed by developer");
    if (this.calculateTotal() > 0) {
      this.loading = true;
      const data = this.cartService.exportOrder();
      this.orderService.checkout(data).subscribe({
        next: (res) => {
          this.redirecting = true;
          window.location.href = res.link;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
