import { HttpParams } from '@angular/common/http';
import { Category } from 'src/app/category/models/category';
import { CategoryService } from './../../../category/services/category.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductFilter } from '../../models/product-filter';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  faCaretRight,
  faSliders,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
  starIcon = faStar;
  filterIcon = faSliders;
  expandedIcon = faCaretRight;

  isExpandedFilter: boolean = false;

  page: number = 1;
  totalPage: number = 0;
  categories: Category[] = [];

  form!: FormGroup;
  @Output() productFilterChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: '',
      categoryNames: this.fb.array([]),
      star: '',
      priceStart: '',
      priceEnd: '',
    });
    this.getCategory(this.page);
  }

  toggleExpandedFilter() {
    this.isExpandedFilter = !this.isExpandedFilter;
  }

  updateCategoryNames(event: any) {
    const formArray: FormArray = this.form.get('categoryNames') as FormArray;

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;

      formArray.controls.forEach((ctrl: any) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  checkExist(name: string): boolean {
    const formArray: FormArray = this.form.get('categoryNames') as FormArray;

    console.log(formArray.value);
    return formArray.value.filter((data: any) => data == name).lenght > 0
      ? true
      : false;
  }

  getCategory(page: number) {
    const params = new HttpParams().set('page', page);
    this.categoryService.getAll(params).subscribe({
      next: (res) => {
        this.categories = [...this.categories, ...res.content];
        this.totalPage = res.totalPages;
        this.page++;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleScroll(e: any) {
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;

    if (this.page <= this.totalPage) {
      if (scrollHeight - (scrollTop + clientHeight) < 150) {
        this.getCategory(this.page);
      }
    }
  }
  submitFilter() {
    this.productFilterChange.emit(this.form.value);
  }
  reset() {
    this.form.reset();
  }
}
