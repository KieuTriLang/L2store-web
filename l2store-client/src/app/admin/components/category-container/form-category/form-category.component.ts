import { NotificationService } from './../../../../shared/services/notification.service';
import { CategoryService } from './../../../../category/services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss'],
})
export class FormCategoryComponent implements OnInit {
  types: string[] = ['add', 'edit', 'info', 'delete'];
  type: string = '';
  form!: FormGroup;

  @Output() submitStateChange = new EventEmitter<boolean>();
  constructor(
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (this.types.filter((t) => t == params.get('type')).length == 0) {
        this.router.navigate(['/admin/category']);
      } else {
        this.type = params.get('type') || '';
      }
      this.form = this.fb.group({
        id: ['', []],
        name: ['', [Validators.required]],
      });
      if (this.type != 'add') {
        const id = this.route.snapshot.queryParams['id'];
        if (id != null) {
          this.categoryService.getById(+id).subscribe((res) => {
            this.form.setValue({
              id: res.id,
              name: res.name,
            });
          });
        }
      }
    });
    this.route.queryParamMap.subscribe((params) => {
      const id = this.route.snapshot.queryParams['id'];
      if (id != null) {
        this.categoryService.getById(+id).subscribe((res) => {
          this.form.setValue({
            id: res.id,
            name: res.name,
          });
        });
      }
    });
  }

  add() {
    this.categoryService.add(this.form.value).subscribe({
      next: (res) => {
        this.categoryService.changeRequestState(true);
        this.resetForm();

        this.notificationService.addNewNoti({
          type: 'info',
          title: 'Category',
          message: 'Create Category successfully!',
        });
      },
      error: (error) => {
        console.log(error);

        this.notificationService.addNewNoti({
          type: 'danger',
          title: 'Category',
          message: 'Create Category failed!',
        });
      },
    });
  }

  save() {
    this.categoryService.update(this.form.value).subscribe({
      next: (res) => {
        this.categoryService.changeRequestState(true);
        this.notificationService.addNewNoti({
          type: 'info',
          title: 'Category',
          message: 'Update Category successfully!',
        });
      },
      error: (error) => {
        console.log(error);
        this.notificationService.addNewNoti({
          type: 'danger',
          title: 'Category',
          message: 'Update Category failed!',
        });
      },
    });
  }

  delete() {
    this.categoryService.delete(this.form.controls['id'].value).subscribe({
      next: (res) => {
        //
        this.categoryService.changeRequestState(true);
        this.router.navigate(['/admin/category']);
        this.notificationService.addNewNoti({
          type: 'info',
          title: 'Category',
          message: 'Delete Category successfully!',
        });
      },
      error: (error) => {
        console.log(error);
        this.notificationService.addNewNoti({
          type: 'danger',
          title: 'Category',
          message: 'Delete Category failed!',
        });
      },
    });
  }

  resetForm() {
    this.form.reset();
  }

  submitState(state: boolean) {
    this.submitStateChange.emit(state);
  }
}
