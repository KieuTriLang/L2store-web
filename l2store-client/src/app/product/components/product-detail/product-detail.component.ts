import { Title } from '@angular/platform-browser';
import { HttpParams } from '@angular/common/http';
import { Review } from './../../models/review';
import { StorageService } from './../../../shared/services/storage.service';
import { CartService } from './../../../order/services/cart.service';
import { CartItem } from './../../../order/models/cart-item';
import { AuthService } from './../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/product/services/product.service';
import { Component, OnInit } from '@angular/core';
import {
  faCartPlus,
  faCheck,
  faEye,
  faEyeSlash,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { ProductDetail } from '../../models/product-detail';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  starIcon = faStar;
  cartIcon = faCartPlus;
  eyeIcon = faEyeSlash;

  isActive: boolean = false;
  isShowReview: boolean = false;
  isAuthorization: boolean = true;

  isOpenedFormAddReview: boolean = false;

  product!: ProductDetail;
  cartItem!: CartItem;
  evaluates: any[] = [];

  id!: any;
  loading = false;
  formReview!: FormGroup;

  page = 1;
  totalPage = 0;
  reviews: Review[] = [];
  reviewLoad = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private cartService: CartService,
    private fb: FormBuilder,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');

      this.productService.getById(this.id).subscribe({
        next: (res) => {
          this.product = res;
          this.cartItem = {
            id: this.product.id,
            name: this.product.name,
            price:
              this.product.salesoff > 0
                ? this.product.price -
                  (this.product.price * this.product.salesoff) / 100
                : this.product.price,
            quantity: 1,
          };
          this.titleService.setTitle(`L2 | ${this.product.name}`);
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.getReview(this.page);
    });
    this.isAuthorization = this.authService.isAuthenticated();
    this.authService.authenticatedState$.subscribe((state) => {
      this.isAuthorization = this.authService.isAuthenticated();
    });
    this.formReview = this.fb.group({
      star: 5,
      content: '',
    });
  }

  getReview(page: number) {
    const params = new HttpParams().set('page', page);
    this.reviewLoad = true;
    this.productService.getReview(this.id, params).subscribe({
      next: (res) => {
        this.reviews = [...this.reviews, ...res.content];
        this.totalPage = res.totalPages;
        this.page++;
        this.reviewLoad = false;
      },
    });
  }
  changeActive() {
    this.eyeIcon = this.eyeIcon == faEyeSlash ? faEye : faEyeSlash;
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.isShowReview = false;
      this.isOpenedFormAddReview = false;
    }
  }

  toggleFormAddReview() {
    this.isShowReview = true;
    this.isActive = false;
    this.isOpenedFormAddReview = !this.isOpenedFormAddReview;
  }

  toggleReview() {
    this.isShowReview = !this.isShowReview;
    if (this.isShowReview) {
      this.isActive = false;
    } else {
      this.isOpenedFormAddReview = false;
    }
  }

  handleQuantity(value: number) {
    this.cartItem.quantity =
      this.cartItem.quantity + value < 0 ? 0 : this.cartItem.quantity + value;
  }
  handleInputQuantity(event: any) {
    this.cartItem.quantity = event.target.value < 0 ? 0 : +event.target.value;
  }

  async addToCart() {
    this.cartService.addItem('product', this.cartItem);
    this.cartIcon = faCheck;
    await this.timeout(2000);
    this.cartIcon = faCartPlus;
  }

  timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  handleStarActive(value: number) {
    this.formReview.controls['star'].setValue(value);
  }

  submit() {
    this.duringAction();
    this.productService.addReview(this.id, this.formReview.value).subscribe({
      next: (res) => {
        this.afterAction();
        this.page = 1;
        this.reviews = [];
        this.getReview(this.page);
        this.isOpenedFormAddReview = false;
      },
      error: (err) => {
        this.afterAction();
      },
    });
  }

  duringAction() {
    this.loading = true;
    this.formReview.disable();
  }
  afterAction() {
    this.loading = false;
    this.formReview.enable();
    this.formReview.reset();
    this.formReview.controls['star'].setValue(5);
  }
  handleScroll(e: any) {
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;

    if (this.reviewLoad == false && this.page <= this.totalPage) {
      if (scrollHeight - (scrollTop + clientHeight) < 150) {
        this.getReview(this.page);
      }
    }
  }
}
