import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { FormUserComponent } from './components/form-user/form-user.component';

@NgModule({
  declarations: [UserComponent, ChangePassComponent, FormUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
