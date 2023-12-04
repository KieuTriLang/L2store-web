export class OrderOverview {
  constructor(
    public id: number,
    public orderCode: string,
    public buyer: string,
    public payer: string,
    public amountOfProduct: number,
    public amountOfCombo: number,
    public total: number,
    public payed: boolean,
    public paymentType: string,
    public createdTime: number,
    public paymentTime: number,
    public orderState: string
  ) {}
}
