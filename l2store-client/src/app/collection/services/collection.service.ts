import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  REST_API = environment.rest_api;
  requestState = new Subject<boolean>();
  requestState$ = this.requestState.asObservable();

  constructor(private http: HttpClient) {}

  getAll(params: HttpParams): Observable<any> {
    return this.http.get(`${this.REST_API}/combos/explore`, {
      headers: new HttpHeaders({ Skip: '' }),
      params: params,
    });
  }

  getById(id: any): Observable<any> {
    return this.http.get(`${this.REST_API}/combos/${id}`, {
      headers: new HttpHeaders({ Skip: '' }),
    });
  }
  add(collection: any): Observable<any> {
    return this.http.post(`${this.REST_API}/combos/create`, collection);
  }
  update(collection: any): Observable<any> {
    return this.http.put(`${this.REST_API}/combos/update`, collection);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.REST_API}/combos/${id}`);
  }
  changeRequestState(state: boolean) {
    this.requestState.next(state);
  }
}
