import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReviewPaymentComponent } from './components/review-payment/review-payment.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';

@NgModule({
  declarations: [CartComponent, CartItemComponent, ReviewPaymentComponent, OrderSuccessComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
})
export class CartModule {}
