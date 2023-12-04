import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductModule } from './../product/product.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionOverviewComponent } from './components/collection-overview/collection-overview.component';
import { SharedModule } from '../shared/shared.module';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionDetailComponent } from './components/collection-detail/collection-detail.component';

@NgModule({
  declarations: [
    CollectionOverviewComponent,
    CollectionComponent,
    CollectionDetailComponent,
  ],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    SharedModule,
    ProductModule,
    FontAwesomeModule,
  ],
  exports: [CollectionOverviewComponent],
})
export class CollectionModule {}
