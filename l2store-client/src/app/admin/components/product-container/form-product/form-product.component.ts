import { NotificationService } from './../../../../shared/services/notification.service';
import { EvaluateService } from './../../../../product/services/evaluate.service';
import { Review } from './../../../../product/models/review';
import { ProductService } from './../../../../product/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/category/models/category';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  imageIcon = faImage;

  id!: any;

  types: string[] = ['add', 'edit', 'info', 'delete'];
  type: string = '';
  imageSrc: any;
  selectedCategories: Category[] = [];

  form!: FormGroup;
  file!: File;

  page = 1;
  totalPage = 0;
  limited = 12;
  loading = false;
  reviews: Review[] = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (this.types.filter((t) => t == params.get('type')).length == 0) {
        this.router.navigate(['/admin/product']);
      } else {
        this.type = params.get('type') || '';
      }
      this.form = this.fb.group({
        id: [''],
        name: ['', [Validators.required]],
        overview: [''],
        detail: [''],
        image: [''],
        salesoff: [''],
        price: [''],
        categories: this.fb.array(this.selectedCategories),
        averageRate: [],
        amountOfEvaluate: [],
        sold: [],
      });
      if (this.type != 'add') {
        const id = this.route.snapshot.queryParams['id'];
        if (id != null) {
          this.fillForm(id);
        }
      }
    });
    this.route.queryParams.subscribe((params) => {
      const id = this.route.snapshot.queryParams['id'];

      this.id = params['id'];
      if (id != null) {
        this.fillForm(id);
        this.getReviewsByPage();
      }
    });
  }

  submit() {
    if (this.type == 'add') {
      this.add();
    }

    if (this.type == 'edit') {
      this.update();
    }
    if (this.type == 'delete') {
      this.delete();
    }
  }
  add() {
    this.productService.addProduct(this.file, this.form.value).subscribe({
      next: (res) => {
        this.productService.changeRequestState(true);
        this.resetForm();
        this.router.navigate(['/admin/product']);
        this.notificationService.addNewNoti({
          type: 'info',
          title: 'Product',
          message: 'Add product successfully!',
        });
      },
      error: (error) => {
        console.log(error);

        this.notificationService.addNewNoti({
          type: 'danger',
          title: 'Product',
          message: 'Add product failed!',
        });
      },
    });
  }

  update() {
    this.productService.update(this.file, this.form.value).subscribe({
      next: (res) => {
        this.productService.changeRequestState(true);
        this.resetForm();
        this.router.navigate(['/admin/product']);

        this.notificationService.addNewNoti({
          type: 'info',
          title: 'Product',
          message: 'Update product successfully!',
        });
      },
      error: (error) => {
        console.log(error);

        this.notificationService.addNewNoti({
          type: 'danger',
          title: 'Product',
          message: 'Update product failed!',
        });
      },
    });
  }
  delete() {
    this.productService.delete(this.form.controls['id'].value).subscribe({
      next: (res) => {
        this.productService.changeRequestState(true);
        this.resetForm();
        this.router.navigate(['/admin/product']);

        this.notificationService.addNewNoti({
          type: 'info',
          title: 'Product',
          message: 'Delete product successfully!',
        });
      },
      error: (error) => {
        console.log(error);

        this.notificationService.addNewNoti({
          type: 'danger',
          title: 'Product',
          message: 'Delete product failed!',
        });
      },
    });
  }

  fillForm(id: number) {
    this.productService.getById(+id).subscribe((res) => {
      this.selectedCategories = res.categories;
      this.form.patchValue({
        id: res.id,
        name: res.name,
        overview: res.overview,
        detail: res.detail,
        image: res.image,
        salesoff: res.salesoff,
        categories: res.categories,
        price: res.price,
        averageRate: res.averageRate,
        amountOfEvaluate: res.amountOfEvaluate,
        sold: res.sold,
      });
      this.handleSelectedCategoriesChange(res.categories);
      this.imageSrc = res.image;
    });
  }
  readURL(event: any): void {
    if (event?.target?.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);

      this.file = file;
    }
  }

  removeCategory(id: any) {
    this.selectedCategories = this.selectedCategories.filter((c) => c.id != id);
    this.handleSelectedCategoriesChange(this.selectedCategories);
  }

  resetForm() {
    this.selectedCategories = [];
    this.form.reset();
  }

  handleSelectedCategoriesChange(categories: Category[]) {
    this.selectedCategories = categories;
    const categoriesControl = <FormArray>this.form.get('categories');
    categoriesControl.clear();
    categories.forEach((data) =>
      categoriesControl.push(
        this.fb.group({
          id: data.id,
          name: data.name,
          locked: data.locked,
        })
      )
    );
  }

  getReviewsByPage() {
    const params = new HttpParams()
      .set('page', this.page)
      .set('limited', this.limited);
    this.productService.getReview(this.id, params).subscribe((res) => {
      this.page = res.pageable.pageNumber + 1;
      this.reviews = res.content;
      this.totalPage = res.totalPages;
    });
  }
  handlePageChange(page: number) {
    this.page = page;
    this.getReviewsByPage();
  }
}
