import { Observable, Subject } from 'rxjs';
import { CartService } from './cart.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  REST_API = environment.rest_api;

  tokentOrder = '';

  requestState = new Subject<boolean>();
  requestState$ = this.requestState.asObservable();
  constructor(private http: HttpClient) {}

  getDataOrderStatistic(): Observable<any> {
    return this.http.get(`${this.REST_API}/orders/data-order-statistic`);
  }
  getAll(params: HttpParams): Observable<any> {
    return this.http.get(`${this.REST_API}/orders`, { params: params });
  }
  getOrderState(): Observable<any> {
    return this.http.get(`${this.REST_API}/orders/order-state`);
  }
  updateOrderState(orderCode: string, orderState: string): Observable<any> {
    return this.http.put(
      `${this.REST_API}/orders/order-state?orderCode=${orderCode}&orderState=${orderState}`,
      ''
    );
  }
  getById(id: any): Observable<any> {
    return this.http.get(`${this.REST_API}/orders/${id}`);
  }
  getHistory(params: HttpParams): Observable<any> {
    return this.http.get(`${this.REST_API}/orders/my-orders`, {
      params: params,
    });
  }
  checkout(data: any): Observable<any> {
    return this.http.post(
      `${this.REST_API}/orders/paypal/authorize-payment`,
      data
    );
  }
  cancelPayment(token: any): Observable<any> {
    return this.http.get(
      `${this.REST_API}/orders/paypal/cancel-payment/${token}`
    );
  }
  reviewPayment(paymentId: string, payerId: string): Observable<any> {
    const params = new HttpParams()
      .set('paymentId', paymentId)
      .set('PayerID', payerId);
    return this.http.get(`${this.REST_API}/orders/paypal/review-payment`, {
      params: params,
    });
  }
  excutePayment(paymentId: string, payerId: string): Observable<any> {
    return this.http.post(`${this.REST_API}/orders/paypal/excute-payment`, {
      paymentId: paymentId,
      payerId: payerId,
    });
  }

  changeRequestState(value: boolean) {
    this.requestState.next(value);
  }
}
