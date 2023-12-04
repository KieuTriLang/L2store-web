import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../../category/services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-category',
  templateUrl: './table-category.component.html',
  styleUrls: ['./table-category.component.scss'],
})
export class TableCategoryComponent implements OnInit {
  page: number = 1;
  limited: number = 10;
  totalPage: number = 0;
  categories: any[] = [];
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryService.requestState$.subscribe((state) => {
      if (state) {
        this.getByPage();
      }
    });
    this.route.queryParams.subscribe((params) => {
      this.page = params['page'] || 1;
      this.getByPage();
    });
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

  changeLocked(id: number) {
    this.categoryService.changeLocked(id);
    this.categoryService.changeRequestState(true);
  }

  handlePageChange(page: number) {
    this.page = page;
    this.getByPage();
  }
  handleSubmitChange(state: boolean) {
    if (state) {
      this.getByPage();
    }
  }
}
