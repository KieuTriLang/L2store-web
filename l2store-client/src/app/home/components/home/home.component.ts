import { HttpParams } from '@angular/common/http';
import { CollectionOverview } from './../../../collection/models/collection-overview';
import { ProductOverview } from './../../../product/models/product-overview';
import { CollectionService } from './../../../collection/services/collection.service';
import { ProductService } from './../../../product/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  topProducts: ProductOverview[] = [];
  topCollections: CollectionOverview[] = [];
  constructor(
    private productService: ProductService,
    private collectionService: CollectionService,
    private titleService: Title
  ) {
    this.titleService.setTitle('L2 | Explore');
  }
  ngOnInit(): void {
    this.getTopSellProduct();
    this.getTopCollection();
  }

  getTopSellProduct() {
    const params = new HttpParams()
      .set('page', 1)
      .set('limited', 8)
      .set('sortTar', 'totalPurchases')
      .set('sortDir', 'desc');

    this.productService.getAll(params).subscribe({
      next: (res) => {
        this.topProducts = res.content;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getTopCollection() {
    const params = new HttpParams().set('page', 1).set('limited', 8);

    this.collectionService.getAll(params).subscribe({
      next: (res) => {
        this.topCollections = res.content;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
