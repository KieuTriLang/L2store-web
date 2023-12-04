import { Category } from 'src/app/category/models/category';

export class ProductDetail {
  constructor(
    public id: number,
    public name: string,
    public overview: string,
    public detail: string,
    public image: string,
    public averageRate: number,
    public amountOfEvaluate: number,
    public price: number,
    public categories: Category[],
    public salesoff: number,
    public sold: number
  ) {}
}
