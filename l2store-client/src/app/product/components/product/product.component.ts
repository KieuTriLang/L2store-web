import { SortItem } from './../../../shared/models/sort-item';
import { Title } from '@angular/platform-browser';
import { ProductFilter } from './../../models/product-filter';
import { HttpParams } from '@angular/common/http';
import { ProductOverview } from './../../models/product-overview';
import { ProductService } from './../../services/product.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  loading: boolean = true;

  page: number = 1;
  sortTar: string = 'totalPurchases';
  sortDir: string = 'desc';
  totalPage: number = 0;

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
  products: ProductOverview[] = [];

  isFilter: boolean = false;
  searchText: string = '';
  productFilter: ProductFilter = {
    name: '',
    categoryNames: [],
    star: 0,
    priceStart: 0,
    priceEnd: 0,
  };
  constructor(
    private productService: ProductService,
    private titleService: Title
  ) {
    this.titleService.setTitle('L2 | Products');
  }

  ngOnInit(): void {
    this.getProduct(this.page);
  }

  onSearchTextEntered(searchText: string) {
    this.searchText = searchText;
    this.productFilter.name = this.searchText;
  }

  getProduct(page: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('sortTar', this.sortTar)
      .set('sortDir', this.sortDir);
    this.loading = true;
    this.productService.getAll(params).subscribe({
      next: (res) => {
        this.products = [...this.products, ...res.content];
        this.totalPage = res.totalPages;
        this.page++;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getProductWithFilter(page: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('sortTar', this.sortTar)
      .set('sortDir', this.sortDir)
      .set('filter', JSON.stringify(this.productFilter));
    this.loading = true;
    this.productService.getAll(params).subscribe({
      next: (res) => {
        this.products = [...this.products, ...res.content];
        this.totalPage = res.totalPages;
        this.page++;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleScroll(e: any) {
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;

    if (this.loading == false && this.page <= this.totalPage) {
      if (scrollHeight - (scrollTop + clientHeight) < 150) {
        if (this.filterIsEmpty()) {
          this.getProduct(this.page);
        } else {
          this.getProductWithFilter(this.page);
        }
      }
    }
  }

  handleFilter(value: any) {
    this.productFilter = {
      name: this.searchText,
      categoryNames: value.categoryNames,
      star: value.star | 0,
      priceStart: value.priceStart | 0,
      priceEnd: value.priceEnd | 0,
    };
    this.page = 1;
    this.products = [];
    if (this.filterIsEmpty()) {
      this.getProduct(this.page);
    } else {
      this.getProductWithFilter(this.page);
    }
  }

  filterIsEmpty(): boolean {
    if (
      this.productFilter.name == '' &&
      this.productFilter.categoryNames.length == 0 &&
      this.productFilter.star == 0 &&
      this.productFilter.priceStart == 0 &&
      this.productFilter.priceEnd == 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  handleSubmitSearch(value: any) {
    if (value) {
      this.page = 1;
      this.products = [];
      if (this.filterIsEmpty()) {
        this.getProduct(this.page);
      } else {
        this.getProductWithFilter(this.page);
      }
    }
  }

  handleSort(value: SortItem) {
    this.sortTar = value.sortTar;
    this.sortDir = value.sortDir;
    this.page = 1;
    this.products = [];
    if (this.filterIsEmpty()) {
      this.getProduct(this.page);
    } else {
      this.getProductWithFilter(this.page);
    }
  }
}
