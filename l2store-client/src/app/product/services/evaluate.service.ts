import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EvaluateService {
  REST_API = environment.rest_api;
  constructor(private http: HttpClient) {}

  getAll(params: HttpParams): Observable<any> {
    return this.http.get(`${this.REST_API}/evaluates`, { params: params });
  }
  searchContentContain(params: HttpParams): Observable<any> {
    return this.http.get(`${this.REST_API}/evaluates/search`, {
      params: params,
    });
  }

  deleteMultiEvaluate(ids: number[]): Observable<any> {
    const params = new HttpParams().set('ids', ids.toString());
    return this.http.delete(`${this.REST_API}/evaluates/delete`, {
      params: params,
    });
  }
}
