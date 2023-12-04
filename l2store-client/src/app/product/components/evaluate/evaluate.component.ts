import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../models/review';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.scss'],
})
export class EvaluateComponent implements OnInit {
  @Input() review!: Review;
  constructor() {}

  ngOnInit(): void {}
}
