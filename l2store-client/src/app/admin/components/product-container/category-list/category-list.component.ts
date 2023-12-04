import { CategoryService } from './../../../../category/services/category.service';
import { Category } from './../../../../category/models/category';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  @Input() selectedCategories: any[] = [];
  @Output() selectedCategoriesChange: EventEmitter<any> =
    new EventEmitter<any>();

  page: number = 1;
  limited: number = 15;
  totalPage: number = 0;

  categories: Category[] = [];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.requestState$.subscribe((state) => {
      if (state) {
        this.getByPage();
      }
    });
    this.getByPage();
  }

  getByPage() {
    const params = new HttpParams()
      .set('page', this.page)
      .set('limited', this.limited);
    this.categoryService.getAll(params).subscribe((res) => {
      this.page = res.pageable.pageNumber + 1;
      this.categories = res.content;
      this.totalPage = res.totalPages;
    });
  }

  checkExistCategory(id: any): boolean {
    return this.selectedCategories.filter((c) => c?.id == id).length > 0;
  }

  handlePageChange(page: number) {
    this.page = page;
    this.getByPage();
  }
  handleSelect(id: any) {
    if (this.checkExistCategory(id)) {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c?.id != id
      );
    } else {
      const item = this.categories.filter((c) => c?.id == id)[0];
      this.selectedCategories.push(item);
    }
    this.selectedCategoriesChange.emit(this.selectedCategories);
  }
}
