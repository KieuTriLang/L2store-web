import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from './../../services/collection.service';
import { CartService } from './../../../order/services/cart.service';
import { faCartPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from 'src/app/order/models/cart-item';
import { CollectionDetail } from './../../models/collection-detail';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.scss'],
})
export class CollectionDetailComponent implements OnInit {
  cartIcon = faCartPlus;

  collection!: CollectionDetail;
  cartItem!: CartItem;
  constructor(
    private cartService: CartService,
    private collectionService: CollectionService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      this.collectionService.getById(id).subscribe({
        next: (res) => {
          this.collection = res;
          this.cartItem = {
            id: this.collection.id,
            name: this.collection.name,
            price:
              this.collection.salesoff > 0
                ? this.collection.totalPrice -
                  (this.collection.totalPrice * this.collection.salesoff) / 100
                : this.collection.totalPrice,
            quantity: 1,
          };
          this.titleService.setTitle(`L2 | ${this.collection.name}`);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }
  handleQuantity(value: number) {
    this.cartItem.quantity =
      this.cartItem.quantity + value < 0 ? 0 : this.cartItem.quantity + value;
  }
  handleInputQuantity(event: any) {
    this.cartItem.quantity = event.target.value < 0 ? 0 : +event.target.value;
  }
  async addToCart() {
    this.cartService.addItem('collection', this.cartItem);
    this.cartIcon = faCheck;
    await this.timeout(2000);
    this.cartIcon = faCartPlus;
  }

  timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
