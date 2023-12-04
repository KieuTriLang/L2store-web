import { FormControl } from '@angular/forms';
import { ProductService } from './../../../../product/services/product.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { debounceTime, delay, map } from 'rxjs';
import { ProductFilter } from 'src/app/product/models/product-filter';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  page: number = 1;
  limited: number = 8;
  totalPage: number = 0;

  @Input() selectedProducts: any[] = [];
  @Output() selectedProductsChange: EventEmitter<any[]> = new EventEmitter<
    any[]
  >();

  searchBar = new FormControl();
  products: any[] = [];
  searchIcon = faSearch;

  productFilter: ProductFilter = {
    name: '',
    categoryNames: [],
    star: 0,
    priceStart: 0,
    priceEnd: 0,
  };
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.requestState$.subscribe((state) => {
      if (state) {
        this.getByPage();
      }
    });
    this.getByPage();
    this.searchBar.valueChanges
      .pipe(
        map((i: any) => i),
        debounceTime(500)
      )
      .subscribe((value) => {
        this.productFilter.name = value;
        this.handleSearch(value);
      });
  }

  getByPage() {
    const params = new HttpParams()
      .set('page', this.page)
      .set('limited', this.limited);
    this.productService.getAll(params).subscribe((res) => {
      this.page = res.pageable.pageNumber + 1;
      this.products = res.content;
      this.totalPage = res.totalPages;
    });
  }

  checkExistProduct(id: any): boolean {
    return this.selectedProducts.filter((p) => p?.id == id).length > 0;
  }

  handlePageChange(page: number) {
    this.page = page;
    if (this.filterIsEmpty()) {
      this.getByPage();
    } else {
      this.getProductWithFilter(this.page);
    }
  }
  handleSelect(id: any) {
    if (this.checkExistProduct(id)) {
      this.selectedProducts = this.selectedProducts.filter((p) => p?.id != id);
    } else {
      const item = this.products.filter((p) => p?.id == id)[0];
      this.selectedProducts.push(item);
    }

    this.selectedProductsChange.emit(this.selectedProducts);
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
  handleSearch(value: any) {
    if (value) {
      this.page = 1;
      this.products = [];
      this.getProductWithFilter(this.page);
    } else {
      this.getByPage();
    }
  }
  getProductWithFilter(page: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('limited', this.limited)
      .set('filter', JSON.stringify(this.productFilter));
    this.productService.getAll(params).subscribe({
      next: (res) => {
        this.products = res.content;
        this.totalPage = res.totalPages;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
