export class Review {
  constructor(
    public id: number,
    public star: number,
    public content: string,
    public productId: number,
    public productName: string,
    public userName: string,
    public avatar: string,
    public postedTime: string
  ) {}
}
