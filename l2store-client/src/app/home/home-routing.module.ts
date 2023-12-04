import { DenyRoleGuard } from './../shared/guards/deny-role.guard';
import { HistoryDetailComponent } from './../order/components/history-detail/history-detail.component';
import { HistoryComponent } from './../order/components/history/history.component';
import { AnonymousGuard } from './../shared/guards/anonymous.guard';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { ContainerComponent } from './components/container/container.component';
import { AuthGuard } from './../shared/guards/auth.guard';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RoleGuard } from '../shared/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'explore',
        component: HomeComponent,
        // canActivate: [DenyRoleGuard],
        // data: { roles: ['ROLE_MANAGER'], redirect: '/admin/home' },
      },
      {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [AnonymousGuard],
      },
      {
        path: 'forgot-password',
        component: ForgotPassComponent,
        canActivate: [AnonymousGuard],
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        canActivate: [AnonymousGuard],
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [AnonymousGuard],
      },
      {
        path: 'confirm',
        component: ConfirmAccountComponent,
        canActivate: [AnonymousGuard],
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../product/product-routing.module').then(
            (m) => m.ProductRoutingModule
          ),
      },
      {
        path: 'collections',
        loadChildren: () =>
          import('../collection/collection-routing.module').then(
            (m) => m.CollectionRoutingModule
          ),
      },
      {
        path: 'my-cart',
        canActivate: [DenyRoleGuard],
        data: { roles: ['ROLE_MANAGER'], redirect: '/explore' },
        loadChildren: () =>
          import('../cart/cart-routing.module').then(
            (m) => m.CartRoutingModule
          ),
      },
      {
        path: 'history',
        component: HistoryComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['ROLE_USER'] },
      },
      {
        path: 'history/:id',
        component: HistoryDetailComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['ROLE_USER'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
