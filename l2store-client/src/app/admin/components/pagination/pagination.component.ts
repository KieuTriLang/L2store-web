import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  angleLIcon = faAngleLeft;
  angleRIcon = faAngleRight;

  @Input() page: number = 1;
  @Input() totalPage: number = 0;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  changePage(step: number) {
    if (this.page + step > this.totalPage || this.page + step < 1) {
      return;
    }
    this.pageChange.emit(this.page + step);
  }

  inputChange(event: Event) {
    const page = (event.target as HTMLInputElement).value;
    if (page != null && +page > 0 && +page <= this.totalPage) {
      this.page = +page;
      this.pageChange.emit(this.page);
    }
  }
}
