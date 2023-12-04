import { ProductService } from './../../../../product/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductOverview } from './../../../../product/models/product-overview';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SortItem } from 'src/app/shared/models/sort-item';

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.scss'],
})
export class TableProductComponent implements OnInit {
  editIcon = faEdit;
  deleteIcon = faTrash;

  page: number = 1;
  limited: number = 7;
  totalPage: number = 0;
  sortTar: string = 'totalPurchases';
  sortDir: string = 'desc';

  products: ProductOverview[] = [];

  sortList: SortItem[] = [
    {
      name: 'Best seller',
      sortTar: 'totalPurchases',
      sortDir: 'desc',
    },
    {
      name: 'Highest price',
      sortTar: 'price',
      sortDir: 'desc',
    },
    {
      name: 'Highest number of review',
      sortTar: 'evaluates',
      sortDir: 'desc',
    },
    {
      name: 'Lowest price',
      sortTar: 'price',
      sortDir: 'asc',
    },
    {
      name: 'On sale',
      sortTar: 'salesoff',
      sortDir: 'desc',
    },
    {
      name: 'Highest rate',
      sortTar: 'averageRate',
      sortDir: 'desc',
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.requestState$.subscribe((state) => {
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
      .set('limited', this.limited)
      .set('sortTar', this.sortTar)
      .set('sortDir', this.sortDir);
    this.productService.getAll(params).subscribe((res) => {
      this.page = res.pageable.pageNumber + 1;
      this.products = res.content;
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
  handleSort(value: SortItem) {
    this.sortTar = value.sortTar;
    this.sortDir = value.sortDir;
    this.page = 1;
    this.products = [];
    this.getByPage();
  }
}
