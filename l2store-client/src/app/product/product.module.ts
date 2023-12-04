import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductComponent } from './components/product/product.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { EvaluateComponent } from './components/evaluate/evaluate.component';

@NgModule({
  declarations: [
    ProductOverviewComponent,
    ProductDetailComponent,
    ProductComponent,
    FilterBarComponent,
    EvaluateComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [ProductOverviewComponent],
})
export class ProductModule {}
