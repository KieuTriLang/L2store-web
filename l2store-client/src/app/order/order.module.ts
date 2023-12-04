import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { HistoryComponent } from './components/history/history.component';
import { HistoryDetailComponent } from './components/history-detail/history-detail.component';

@NgModule({
  declarations: [HistoryComponent, HistoryDetailComponent],
  imports: [CommonModule, OrderRoutingModule, SharedModule],
})
export class OrderModule {}
