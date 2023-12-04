import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'applyDiscount',
})
export class ApplyDiscountPipe implements PipeTransform {
  transform(price: number, salesoff: number = 0): number {
    return price - (price * salesoff) / 100;
  }
}
