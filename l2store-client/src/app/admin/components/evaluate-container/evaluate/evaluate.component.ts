import { FormControl } from '@angular/forms';
import { NotificationService } from './../../../../shared/services/notification.service';
import { Review } from './../../../../product/models/review';
import { ActivatedRoute } from '@angular/router';
import { EvaluateService } from './../../../../product/services/evaluate.service';
import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.scss'],
})
export class EvaluateComponent implements OnInit {
  deleteMode = false;
  page = 1;
  limited = 12;
  totalPage = 0;

  selectedDelete: number[] = [];
  reviews: Review[] = [];

  search = new FormControl();
  constructor(
    private evaluateService: EvaluateService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.page = params['page'] || 1;
      this.getByPage();
    });
    this.search.valueChanges
      .pipe(
        map((i: any) => i),
        debounceTime(500)
      )
      .subscribe((value) => {
        this.searchContentContain(value);
      });
  }

  getByPage() {
    const params = new HttpParams()
      .set('page', this.page)
      .set('limited', this.limited);
    this.evaluateService.getAll(params).subscribe((res) => {
      this.page = res.pageable.pageNumber + 1;
      this.reviews = res.content;
      this.totalPage = res.totalPages;
    });
  }
  searchContentContain(searchText: string) {
    const params = new HttpParams()
      .set('page', this.page)
      .set('limited', this.limited)
      .set('search', searchText);
    this.evaluateService.searchContentContain(params).subscribe((res) => {
      this.page = res.pageable.pageNumber + 1;
      this.reviews = res.content;
      this.totalPage = res.totalPages;
    });
  }
  handlePageChange(page: number) {
    this.page = page;
    this.getByPage();
  }
  checkSelectDelete(id: number): boolean {
    return this.selectedDelete.indexOf(id) >= 0;
  }
  toggleSelectDelete(id: number) {
    if (this.checkSelectDelete(id)) {
      this.selectedDelete = this.selectedDelete.filter((value) => value != id);
    } else {
      this.selectedDelete.push(id);
    }
  }
  submit() {
    this.evaluateService.deleteMultiEvaluate(this.selectedDelete).subscribe({
      next: (res) => {
        this.notificationService.addNewNoti({
          type: 'info',
          title: 'Review',
          message: `Delete ${this.selectedDelete.length} reviews successfully`,
        });
        this.reviews = this.reviews.filter(
          (value) => this.selectedDelete.indexOf(value.id) < 0
        );
        this.selectedDelete = [];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
