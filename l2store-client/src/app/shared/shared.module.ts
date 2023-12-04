import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HoverClassDirective } from './hover-class.directive';
import { RouterModule } from '@angular/router';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { StarListComponent } from './components/star-list/star-list.component';
import { ApplyDiscountPipe } from './pipes/apply-discount.pipe';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { SortSelectComponent } from './components/sort-select/sort-select.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HoverClassDirective,
    SectionTitleComponent,
    SearchBarComponent,
    LoadingComponent,
    StarListComponent,
    ApplyDiscountPipe,
    NotFoundPageComponent,
    SortSelectComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, RouterModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    HoverClassDirective,
    SectionTitleComponent,
    SearchBarComponent,
    LoadingComponent,
    StarListComponent,
    ApplyDiscountPipe,
    SortSelectComponent,
  ],
})
export class SharedModule {}
