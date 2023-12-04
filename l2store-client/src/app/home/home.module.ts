import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SectionTitleComponent } from '../shared/components/section-title/section-title.component';
import { ProductModule } from '../product/product.module';
import { CollectionModule } from '../collection/collection.module';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContainerComponent } from './components/container/container.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    ContainerComponent,
    ForgotPassComponent,
    ConfirmAccountComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ProductModule,
    CollectionModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
})
export class HomeModule {}
