import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { UserComponent } from './components/user-container/user/user.component';
import { ProductComponent } from './components/product-container/product/product.component';
import { ComboComponent } from './components/combo/combo.component';
import { OrderComponent } from './components/order-container/order/order.component';
import { TableComponent } from './components/user-container/table/table.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormUserComponent } from './components/user-container/form-user/form-user.component';
import { FormRoleComponent } from './components/user-container/form-role/form-role.component';
import { TableProductComponent } from './components/product-container/table-product/table-product.component';
import { FormProductComponent } from './components/product-container/form-product/form-product.component';
import { CategoryListComponent } from './components/product-container/category-list/category-list.component';
import { CategoryComponent } from './components/category-container/category/category.component';
import { TableCategoryComponent } from './components/category-container/table-category/table-category.component';
import { FormCategoryComponent } from './components/category-container/form-category/form-category.component';
import { TableActionsComponent } from './components/table-actions/table-actions.component';
import { CollectionComponent } from './components/collection-container/collection/collection.component';
import { TableCollectionComponent } from './components/collection-container/table-collection/table-collection.component';
import { FormCollectionComponent } from './components/collection-container/form-collection/form-collection.component';
import { ProductListComponent } from './components/collection-container/product-list/product-list.component';
import { TableOrderComponent } from './components/order-container/table-order/table-order.component';
import { EvaluateComponent } from './components/evaluate-container/evaluate/evaluate.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SortByComponent } from './components/sort-by/sort-by.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [
    ContainerComponent,
    NavbarComponent,
    MainComponent,
    UserComponent,
    ProductComponent,
    ComboComponent,
    OrderComponent,
    TableComponent,
    StatisticComponent,
    PaginationComponent,
    FormUserComponent,
    FormRoleComponent,
    TableProductComponent,
    FormProductComponent,
    CategoryListComponent,
    CategoryComponent,
    TableCategoryComponent,
    FormCategoryComponent,
    TableActionsComponent,
    CollectionComponent,
    TableCollectionComponent,
    FormCollectionComponent,
    ProductListComponent,
    EvaluateComponent,
    TableOrderComponent,
    NotificationComponent,
    SortByComponent,
    ChartComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
