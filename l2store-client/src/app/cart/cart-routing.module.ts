import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ReviewPaymentComponent } from './components/review-payment/review-payment.component';
import { CartComponent } from './components/cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RoleGuard } from '../shared/guards/role.guard';

const routes: Routes = [
  { path: '', component: CartComponent },
  {
    path: 'review-payment',
    component: ReviewPaymentComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_USER'] },
  },
  {
    path: 'payment-success',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_USER'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
