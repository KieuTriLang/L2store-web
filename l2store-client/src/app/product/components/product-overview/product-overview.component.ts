import { ProductOverview } from './../../models/product-overview';
import { Component, Input, OnInit } from '@angular/core';
import { faCartPlus, faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss'],
})
export class ProductOverviewComponent implements OnInit {
  starIcon = faStar;
  cartIcon = faCartPlus;

  @Input() productOverview!: ProductOverview;
  constructor() {}

  ngOnInit(): void {}
}
