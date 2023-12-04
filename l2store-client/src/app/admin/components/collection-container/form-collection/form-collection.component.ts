import { NotificationService } from './../../../../shared/services/notification.service';
import { CollectionService } from './../../../../collection/services/collection.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ProductOverview } from './../../../../product/models/product-overview';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-collection',
  templateUrl: './form-collection.component.html',
  styleUrls: ['./form-collection.component.scss'],
})
export class FormCollectionComponent implements OnInit {
  types: string[] = ['add', 'edit', 'info', 'delete'];
  type: string = '';
  selectedProducts: any[] = [];

  form!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (this.types.filter((t) => t == params.get('type')).length == 0) {
        this.router.navigate(['/admin/collection']);
      } else {
        this.type = params.get('type') || '';
      }
      this.form = this.fb.group({
        id: [''],
        name: ['', [Validators.required]],
        description: [''],
        salesoff: [''],
        total: [''],
        productIds: this.fb.array([]),
      });
      if (this.type != 'add') {
        const id = this.route.snapshot.queryParams['id'];
        if (id != null) {
          this.fillFormById(id);
        }
      }
    });
    this.route.queryParamMap.subscribe((params) => {
      const id = this.route.snapshot.queryParams['id'];
      if (id != null) {
        this.fillFormById(id);
      }
    });
  }

  fillFormById(id: number) {
    this.collectionService.getById(+id).subscribe((res) => {
      this.selectedProducts = res.productOverviews;
      this.form.patchValue({
        id: res.id,
        name: res.name,
        description: res.description,
        salesoff: res.salesoff | 0,
        total: res.totalPrice,
        productIds: res.productOverviews.map((item: any) => item.id),
      });
      this.handleSelectedProduct(res.productOverviews);
    });
  }
  removeProduct(id: any) {
    this.selectedProducts = this.selectedProducts.filter((p) => p.id != id);
    this.handleSelectedProduct(this.selectedProducts);
    this.countTotal();
  }

  resetForm() {
    this.selectedProducts = [];
    this.form.reset();
  }

  handleSelectedProduct(products: ProductOverview[]) {
    this.selectedProducts = products;
    const productsControl = <FormArray>this.form.get('productIds');
    productsControl.clear();
    products.forEach((data) => {
      productsControl.push(new FormControl(data.id));
    });
    this.countTotal();
  }

  countTotal() {
    const sum = this.selectedProducts.reduce(
      (sum, current) =>
        sum + (current.price - (current.price * current.salesoff) / 100),
      0
    );
    this.form.controls['total'].setValue(sum);
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
    this.collectionService.add(this.form.value).subscribe({
      next: (res) => {
        this.resetForm();
        this.router.navigate(['/admin/collection']);
        this.notificationService.addNewNoti({
          type: 'info',
          title: 'Collection',
          message: 'Create collection successfully!',
        });
      },
      error: (err) => {
        console.log(err);
        this.notificationService.addNewNoti({
          type: 'danger',
          title: 'Collection',
          message: 'Create collection failed!',
        });
      },
    });
  }

  update() {
    this.collectionService.update(this.form.value).subscribe({
      next: (res) => {
        this.resetForm();
        this.router.navigate(['/admin/collection']);
        this.notificationService.addNewNoti({
          type: 'info',
          title: 'Collection',
          message: 'Update collection successfully!',
        });
      },
      error: (err) => {
        console.log(err);
        this.notificationService.addNewNoti({
          type: 'danger',
          title: 'Collection',
          message: 'Update collection failed!',
        });
      },
    });
  }

  delete() {
    this.collectionService.delete(this.form.controls['id'].value).subscribe({
      next: (res) => {
        this.resetForm();
        this.router.navigate(['/admin/collection']);
        this.notificationService.addNewNoti({
          type: 'info',
          title: 'Collection',
          message: 'Delete collection successfully!',
        });
      },
      error: (err) => {
        console.log(err);
        this.notificationService.addNewNoti({
          type: 'danger',
          title: 'Collection',
          message: 'Delete collection failed!',
        });
      },
    });
  }
}
