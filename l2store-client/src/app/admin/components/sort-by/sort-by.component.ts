import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortItem } from 'src/app/shared/models/sort-item';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss'],
})
export class SortByComponent implements OnInit {
  opened = false;
  selectedSort!: SortItem;
  @Input() sortList: SortItem[] = [];
  @Output() sortItemSelected: EventEmitter<SortItem> =
    new EventEmitter<SortItem>();
  constructor() {}

  ngOnInit(): void {
    this.selectedSort = this.sortList[0];
  }

  selectSort(sortItem: SortItem) {
    this.selectedSort = this.sortList.filter((value) => value == sortItem)[0];
    this.sortItemSelected.emit(this.selectedSort);
    this.opened = false;
  }
  filterSort(arr: SortItem[]): SortItem[] {
    return this.sortList.filter(
      (value: SortItem) => value != this.selectedSort
    );
  }
}
