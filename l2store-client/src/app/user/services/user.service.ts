import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  requestState = new Subject<boolean>();
  requestState$ = this.requestState.asObservable();
  private REST_API_SERVER = environment.rest_api;
  constructor(private http: HttpClient) {}

  public getTotalUser(): Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}/users/total-user`);
  }
  public getUserRoleUser(params: HttpParams): Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}/users/role-user`, {
      params: params,
    });
  }

  public resetPassword(token: any, password: any): Observable<any> {
    return this.http.post(
      `${this.REST_API_SERVER}/users/reset/${token}`,
      password
    );
  }

  public changePassword(data: any): Observable<any> {
    return this.http.post(
      `${this.REST_API_SERVER}/users/change-password`,
      data
    );
  }

  getInfo(): Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}/users/profile`);
  }

  updateUser(data: any): Observable<any> {
    let fd = new FormData();
    fd.set('dataJson', JSON.stringify(data));
    return this.http.put(`${this.REST_API_SERVER}/users/update`, fd);
  }

  changeRequestState(value: boolean) {
    this.requestState.next(value);
  }
}
