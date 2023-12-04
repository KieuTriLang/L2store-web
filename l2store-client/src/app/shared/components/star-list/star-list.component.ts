import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faStar as faFillStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStrokeStar } from '@fortawesome/free-regular-svg-icons';

interface Star {
  default: any;
  active: any;
  isActive: boolean;
}
@Component({
  selector: 'app-star-list',
  templateUrl: './star-list.component.html',
  styleUrls: ['./star-list.component.scss'],
})
export class StarListComponent implements OnInit {
  @Input() isAction: boolean = true;
  @Input() numberOfStarActive: number = 5;
  @Input() numberOfStar: number = 5;
  starList: Star[] = [];

  @Output() onStarActived: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {
    this.starList = Array(this.numberOfStarActive).fill({
      default: faStrokeStar,
      active: faFillStar,
      isActive: true,
    });
    this.starList = [
      ...this.starList,
      ...Array(this.numberOfStar - this.numberOfStarActive).fill({
        default: faStrokeStar,
        active: faFillStar,
        isActive: false,
      }),
    ];
  }

  onClick(index: number) {
    if (!this.isAction) return;
    this.starList = this.starList.map((s: Star, i: number) =>
      i <= index ? { ...s, isActive: true } : { ...s, isActive: false }
    );
    this.countStarActive();
  }
  countStarActive() {
    const starActive = this.starList.filter((s) => s.isActive == true).length;
    this.onStarActived.emit(starActive);
  }
}
