import { Observable, Subject } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private REST_API = environment.rest_api;

  requestState = new Subject<boolean>();
  requestState$ = this.requestState.asObservable();

  constructor(private http: HttpClient) {}

  public changeRequestState(state: boolean) {
    this.requestState.next(state);
  }

  public getAll(params: HttpParams): Observable<any> {
    return this.http.get<any>(`${this.REST_API}/categories`, {
      params: params,
    });
  }

  public getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.REST_API}/categories/${id}`);
  }

  public add(category: any): Observable<any> {
    return this.http.post(`${this.REST_API}/categories/add`, category);
  }

  public update(category: any): Observable<any> {
    return this.http.put(`${this.REST_API}/categories/update`, category);
  }

  public changeLocked(id: number): Observable<any> {
    return this.http.put(`${this.REST_API}/categories/${id}/change-locked`, '');
  }
  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.REST_API}/categories/${id}`);
  }
}
