import { map, debounceTime } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  searchIcon = faSearch;

  text = new FormControl();
  @Output() submitStateChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() searchTextChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.text.valueChanges
      .pipe(
        map((value) => value),
        debounceTime(500)
      )
      .subscribe((data) => {
        this.searchTextChange.emit(data);
      });
  }

  submit() {
    this.submitStateChange.emit(true);
  }
}
