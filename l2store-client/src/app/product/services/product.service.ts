import { ProductFilter } from '../models/product-filter';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  REST_API = environment.rest_api;

  requestState = new Subject<boolean>();
  requestState$ = this.requestState.asObservable();
  constructor(private http: HttpClient) {}

  getAll(params: HttpParams): Observable<any> {
    return this.http.get(`${this.REST_API}/products`, {
      headers: new HttpHeaders({ Skip: '' }),
      params: params,
    });
  }
  getById(id: any): Observable<any> {
    return this.http.get(`${this.REST_API}/products/${id}`, {
      headers: new HttpHeaders({ Skip: '' }),
    });
  }
  addProduct(file: File, product: any): Observable<any> {
    let fd = new FormData();
    fd.append('file', file);
    fd.append('bodyProduct', JSON.stringify(product));
    return this.http.post(`${this.REST_API}/products/add`, fd);
  }

  update(file: File, product: any): Observable<any> {
    let fd = new FormData();
    fd.append('file', file);
    fd.append('bodyProduct', JSON.stringify(product));
    return this.http.put(`${this.REST_API}/products/update`, fd);
  }

  delete(id: any) {
    return this.http.delete(`${this.REST_API}/products/${id}`);
  }
  changeRequestState(value: boolean) {
    this.requestState.next(value);
  }

  addReview(id: any, data: any): Observable<any> {
    return this.http.post(`${this.REST_API}/products/${id}/evaluates`, data);
  }

  getReview(id: any, params: HttpParams): Observable<any> {
    return this.http.get(`${this.REST_API}/products/${id}/evaluates`, {
      headers: new HttpHeaders({ Skip: '' }),
      params: params,
    });
  }
}
