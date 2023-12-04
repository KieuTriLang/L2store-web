import { ProductOverview } from 'src/app/product/models/product-overview';

export class CollectionDetail {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public productOverviews: ProductOverview[],
    public salesoff: number,
    public totalPrice: number
  ) {}
}
