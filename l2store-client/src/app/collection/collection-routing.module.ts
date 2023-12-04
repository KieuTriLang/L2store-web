import { CollectionDetailComponent } from './components/collection-detail/collection-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './components/collection/collection.component';
import { DenyRoleGuard } from '../shared/guards/deny-role.guard';

const routes: Routes = [
  {
    path: '',
    component: CollectionComponent,
  },
  {
    path: ':id',
    component: CollectionDetailComponent,
    canActivate: [DenyRoleGuard],
    data: { roles: ['ROLE_MANAGER'], redirect: '/explore' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionRoutingModule {}
