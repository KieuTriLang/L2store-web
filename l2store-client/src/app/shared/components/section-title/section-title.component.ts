import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss'],
})
export class SectionTitleComponent implements OnInit {
  @Input() prefix: String = '';
  @Input() title: String = 'Section title';
  @Input() seeMore: String = '';
  @Input() center: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
