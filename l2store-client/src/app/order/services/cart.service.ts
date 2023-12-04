import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { Cart } from './../models/cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cart-item';
import { TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  REST_API = environment.rest_api;

  cart: Cart = new Cart([], []);

  cartUpdate = new Subject<boolean>();
  cartUpdate$ = this.cartUpdate.asObservable();
  constructor(private http: HttpClient, private cookieService: CookieService) {
    if (this.cookieService.check('l2_cart')) {
      this.cart = JSON.parse(this.getCookie('l2_cart'));
    }
  }

  getAllItem() {
    return this.cart;
  }
  resetCart() {
    this.cart = { products: [], combos: [] };
    this.saveToCookie('l2_cart', JSON.stringify(this.getAllItem()));
    this.cartUpdate.next(false);
  }
  exportOrder() {
    return {
      products: this.cart.products.map((product) => {
        return { id: product.id, quantity: product.quantity };
      }),
      combos: this.cart.combos.map((combo) => {
        return { id: combo.id, quantity: combo.quantity };
      }),
    };
  }
  addItem(type: string, item: CartItem) {
    if (type == 'product') {
      if (this.checkExist(this.cart.products, item.id)) {
        this.cart.products.forEach((data) => {
          if (data.id == item.id) {
            data.quantity += item.quantity;
          }
        });
      } else {
        this.cart.products.push(item);
      }
    }
    if (type == 'collection') {
      if (this.checkExist(this.cart.combos, item.id)) {
        this.cart.combos.forEach((data) => {
          if (data.id == item.id) {
            data.quantity += item.quantity;
          }
        });
      } else {
        this.cart.combos.push(item);
      }
    }
    this.cartUpdate.next(true);
    this.saveToCookie('l2_cart', JSON.stringify(this.getAllItem()));
  }
  removeItem(type: string, itemId: any) {
    if (type == 'product') {
      this.cart.products = this.cart.products.filter(
        (item) => item.id != itemId
      );
    }
    if (type == 'collection') {
      this.cart.combos = this.cart.combos.filter((item) => item.id != itemId);
    }
    // this.cartUpdate.next(true);

    this.saveToCookie('l2_cart', JSON.stringify(this.getAllItem()));
  }

  checkExist(arr: CartItem[], id: number): boolean {
    return arr.filter((item) => item.id == id).length > 0;
  }

  getCookie(key: string): string {
    return this.cookieService.get(key);
  }
  saveToCookie(key: string, value: string) {
    this.cookieService.set(key, value);
  }
  removeFromCookie(key: string) {
    if (this.cookieService.check(key)) {
      this.cookieService.delete(key);
    }
  }
}
