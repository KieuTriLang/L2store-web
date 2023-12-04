export class CollectionOverview {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public productImages: string[],
    public salesoff: number,
    public totalPrice: number,
    public totalPurchases: number
  ) {}
}
