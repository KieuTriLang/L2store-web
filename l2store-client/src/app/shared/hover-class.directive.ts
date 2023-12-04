import { Directive, HostListener, ElementRef, Input } from '@angular/core';
interface HoverType {
  type: String;
  className: String;
}
@Directive({
  selector: '[hover-class]',
})
export class HoverClassDirective {
  constructor(public elementRef: ElementRef) {}
  @Input('hover-class') hoverClass: HoverType = {
    type: 'both',
    className: 'active',
  };

  @HostListener('mouseenter') onMouseEnter() {
    if (this.hoverClass.type == 'leave') return;
    this.elementRef.nativeElement.classList.add(this.hoverClass.className);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.hoverClass.type == 'enter') return;
    this.elementRef.nativeElement.classList.remove(this.hoverClass.className);
  }
}
