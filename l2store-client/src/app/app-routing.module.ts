import { RoleGuard } from './shared/guards/role.guard';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home-routing.module').then((m) => m.HomeRoutingModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin-routing.module').then((m) => m.AdminRoutingModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_MANAGER'] },
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user-routing.module').then((m) => m.UserRoutingModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_USER'] },
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
