import { CartService } from './../../../order/services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/order/models/cart-item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() index: number = 1;
  @Input() item!: CartItem;
  @Input() type!: string;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  handleQuantity(value: number) {
    this.item.quantity =
      this.item.quantity + value < 0 ? 0 : this.item.quantity + value;
  }

  handleInputQuantity(event: any) {
    this.item.quantity = event.target.value < 0 ? 0 : +event.target.value;
  }
  remove(id: number) {
    this.cartService.removeItem(this.type, id);
  }
}
