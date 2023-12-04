import { Category } from './../../category/models/category';
export class ProductOverview {
  constructor(
    public id: number,
    public name: string,
    public overview: string,
    public image: string,
    public averageRate: number,
    public amountOfEvaluate: number,
    public price: number,
    public categories: Category[],
    public salesoff: number,
    public sold: number
  ) {}
}
