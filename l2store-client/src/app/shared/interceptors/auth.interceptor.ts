import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpBackend,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import {
  catchError,
  lastValueFrom,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  REST_API = environment.rest_api;
  http!: HttpClient;
  constructor(
    private storageService: StorageService,
    private router: Router,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.get('Skip') != undefined) {
      const newHeaders = request.headers.delete('Skip');
      const newRequest = request.clone({ headers: newHeaders });
      return next.handle(newRequest);
    }

    const cloned = request.clone({
      headers: request.headers.set(
        'Authorization',
        'Bearer ' + this.storageService.getTokenFromLocal('l2_access_token')
      ),
    });
    return next.handle(cloned).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (
            err.status === 403 &&
            this.storageService.checkToken() == 'access_expired'
          ) {
            return this.refreshToken(request, next);
          }
        }
        return throwError(() => err);
      })
    );
  }

  refreshToken(request: HttpRequest<unknown>, next: HttpHandler) {
    return this.http
      .get(`${this.REST_API}/users/token/refresh`, {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + this.storageService.getTokenFromLocal('l2_refresh_token')
        ),
      })
      .pipe(
        switchMap((data: any) => {
          for (var key in data) {
            this.storageService.saveTokenToLocal(`l2_${key}`, data[key]);
          }
          const cloned = request.clone({
            headers: request.headers.set(
              'Authorization',
              'Bearer ' + data['access_token']
            ),
          });
          return next.handle(cloned);
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
}
