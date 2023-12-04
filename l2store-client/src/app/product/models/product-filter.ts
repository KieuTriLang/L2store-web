export class ProductFilter {
  constructor(
    public name: string,
    public categoryNames: string[],
    public star: number | string,
    public priceStart: number | string,
    public priceEnd: number | string
  ) {}
}
