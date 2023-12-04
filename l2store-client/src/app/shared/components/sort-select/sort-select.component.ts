import { SortItem } from './../../models/sort-item';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sort-select',
  templateUrl: './sort-select.component.html',
  styleUrls: ['./sort-select.component.scss'],
})
export class SortSelectComponent implements OnInit {
  caretIcon = faCaretRight;
  isOpened = false;
  selectedSort!: SortItem;
  @Input() sortList: SortItem[] = [];
  @Output() sortItemSelected: EventEmitter<SortItem> =
    new EventEmitter<SortItem>();
  constructor() {}

  ngOnInit(): void {
    this.selectedSort = this.sortList[0];
  }
  toggleList() {
    this.isOpened = !this.isOpened;
  }
  selectSort(sortItem: SortItem) {
    this.selectedSort = this.sortList.filter((value) => value == sortItem)[0];
    this.sortItemSelected.emit(this.selectedSort);
    this.isOpened = false;
  }
  filterSort(arr: SortItem[]): SortItem[] {
    return this.sortList.filter(
      (value: SortItem) => value != this.selectedSort
    );
  }
}
