import { CollectionService } from './../../../../collection/services/collection.service';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-collection',
  templateUrl: './table-collection.component.html',
  styleUrls: ['./table-collection.component.scss'],
})
export class TableCollectionComponent implements OnInit {
  page: number = 1;
  limited: number = 8;
  totalPage: number = 0;

  collections: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.collectionService.requestState$.subscribe((state) => {
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
    this.collectionService.getAll(params).subscribe((res) => {
      this.page = res.pageable.pageNumber + 1;
      this.collections = res.content;
      this.totalPage = res.totalPages;
    });
  }
  getByPageWithFilter() {
    // const params = new HttpParams()
    //   .set('page', this.page)
    //   .set('limited', this.limited);
    // this.productService.getAll(params).subscribe((res) => {
    //   this.page = res.pageable.pageNumber + 1;
    //   this.products = res.content;
    //   this.totalPage = res.totalPages;
    // });
  }
  handlePageChange(page: number) {
    this.page = page;
    this.getByPage();
  }
}
