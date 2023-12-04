import { CartService } from './../../order/services/cart.service';
import { StorageService } from './storage.service';
import { BehaviorSubject, lastValueFrom, map, Observable, Subject } from 'rxjs';
import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticatedState = new BehaviorSubject<boolean>(false);
  authenticatedState$ = this.authenticatedState.asObservable();

  roles: string[] = [];
  private REST_API_SERVER = environment.rest_api;

  jwt!: JwtHelperService;

  httpBe!: HttpClient;
  constructor(
    private storageService: StorageService,
    private cartService: CartService,
    private http: HttpClient,
    private router: Router,
    handler: HttpBackend
  ) {
    this.jwt = new JwtHelperService();
    this.httpBe = new HttpClient(handler);
    if (this.isAuthenticated()) {
      this.changeAuthenticatedState(true);
    } else {
      this.changeAuthenticatedState(false);
    }
  }

  public isAuthenticated(): boolean {
    let state = this.storageService.checkToken();
    if (state == 'access_expired') {
      return true;
    }
    if (state == 'unauth') {
      this.authenticatedState.next(false);
      return false;
    }
    return true;
  }

  public signin(
    email: string,
    password: string,
    remember: boolean
  ): Observable<any> {
    const body = new HttpParams().set('email', email).set('password', password);
    this.storageService.saveTokenToLocal('l2_remember', remember + '');
    return this.http.post<any>(
      `${this.REST_API_SERVER}/login`,
      body.toString(),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          Skip: '',
        }),
      }
    );
  }

  public signup(
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    const body = {
      username: username,
      email: email,
      password: password,
    };
    return this.http.post(`${this.REST_API_SERVER}/users/register`, body, {
      headers: new HttpHeaders({ Skip: '' }),
    });
  }

  public logout() {
    this.storageService.removeTokenToLocal('l2_access_token');
    this.storageService.removeTokenToLocal('l2_refresh_token');
    this.cartService.resetCart();
    this.changeAuthenticatedState(false);
  }

  public changeAuthenticatedState(state: boolean) {
    this.authenticatedState.next(state);
  }

  public confirmAccount(token: any): Observable<any> {
    return this.http.get(
      `${this.REST_API_SERVER}/users/confirm?token=${token}`,
      { headers: new HttpHeaders({ Skip: '' }) }
    );
  }

  public sendReConfirm(email: string): Observable<any> {
    return this.http.post(`${this.REST_API_SERVER}/users/re-confirm`, email, {
      headers: new HttpHeaders({ Skip: '' }),
    });
  }

  public sendResetInstruction(email: string): Observable<any> {
    return this.http.post(
      `${this.REST_API_SERVER}/users/reset-password`,
      email,
      { headers: new HttpHeaders({ Skip: '' }) }
    );
  }

  public reset(token: any): Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}/users/reset?token=${token}`, {
      headers: new HttpHeaders({ Skip: '' }),
    });
  }

  public getUsername() {
    let token = this.storageService.getTokenFromLocal('l2_access_token');
    return this.jwt.decodeToken(token) != null
      ? this.jwt.decodeToken(token)['sub']
      : '';
  }

  public hasRole(role: string): boolean {
    return this.storageService.getRoles().filter((r) => r == role).length > 0
      ? true
      : false;
  }
}
