import { CollectionOverview } from './../../models/collection-overview';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection-overview',
  templateUrl: './collection-overview.component.html',
  styleUrls: ['./collection-overview.component.scss'],
})
export class CollectionOverviewComponent implements OnInit {
  @Input() collectionOverview!: CollectionOverview;
  constructor() {}

  ngOnInit(): void {}
}
