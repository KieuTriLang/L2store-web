import { TableOrderComponent } from './components/order-container/table-order/table-order.component';
import { FormCollectionComponent } from './components/collection-container/form-collection/form-collection.component';
import { FormCategoryComponent } from './components/category-container/form-category/form-category.component';
import { CategoryComponent } from './components/category-container/category/category.component';
import { ProductComponent } from './components/product-container/product/product.component';
import { FormRoleComponent } from './components/user-container/form-role/form-role.component';
import { FormUserComponent } from './components/user-container/form-user/form-user.component';
import { UserComponent } from './components/user-container/user/user.component';
import { MainComponent } from './components/main/main.component';
import { ContainerComponent } from './components/container/container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormProductComponent } from './components/product-container/form-product/form-product.component';
import { CollectionComponent } from './components/collection-container/collection/collection.component';
import { OrderComponent } from './components/order-container/order/order.component';
import { EvaluateComponent } from './components/evaluate-container/evaluate/evaluate.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RoleGuard } from '../shared/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      { path: 'home', component: MainComponent },
      {
        path: 'user',
        component: UserComponent,
        children: [
          { path: ':id', component: FormUserComponent },
          { path: ':id/roles', component: FormRoleComponent },
        ],
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      { path: 'product/:type', component: FormProductComponent },
      {
        path: 'category',
        component: CategoryComponent,
        children: [
          {
            path: ':type',
            component: FormCategoryComponent,
          },
        ],
      },
      {
        path: 'collection',
        component: CollectionComponent,
      },
      {
        path: 'collection/:type',
        component: FormCollectionComponent,
      },
      {
        path: 'order',
        component: TableOrderComponent,
      },
      {
        path: 'order/:type',
        component: OrderComponent,
      },
      {
        path: 'evaluate',
        component: EvaluateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
