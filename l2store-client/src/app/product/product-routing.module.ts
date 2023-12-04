import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { DenyRoleGuard } from '../shared/guards/deny-role.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
  },
  {
    path: ':id',
    component: ProductDetailComponent,

    canActivate: [DenyRoleGuard],
    data: { roles: ['ROLE_MANAGER'], redirect: '/explore' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
