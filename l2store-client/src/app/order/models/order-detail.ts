export class OrderDetail {
  constructor(
    public id: number,
    public orderCode: string,
    public orderProducts: OrderItem[],
    public orderCombos: OrderItem[],
    public shipping: number,
    public total: number,
    public payed: number,
    public paymentType: number,
    public createdTime: number,
    public paymentTime: number,
    public buyer: string,
    public payer: string,
    public shippingAddress: string,
    public recipientName: string,
    public city: string,
    public countryCode: string,
    public postalCode: string,
    public phone: string,
    public orderState: string
  ) {}
}

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}
