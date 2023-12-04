import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public checkToken(): string {
    if (this.getTokenFromLocal('l2_access_token') == '') {
      return 'unauth';
    }
    if (
      new JwtHelperService().isTokenExpired(
        this.getTokenFromLocal('l2_access_token')
      )
    ) {
      return 'access_expired';
    }
    if (
      new JwtHelperService().isTokenExpired(
        this.getTokenFromLocal('l2_refresh_token')
      )
    ) {
      return 'refresh_expired';
    }
    return 'pass';
  }
  public getTokenFromLocal(key: string): string {
    return localStorage.getItem(key) || '';
  }
  public saveTokenToLocal(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  public removeTokenToLocal(key: string) {
    localStorage.removeItem(key);
  }

  public getRoles(): any[] {
    return this.getTokenFromLocal('l2_access_token') != ''
      ? new JwtHelperService().decodeToken(
          this.getTokenFromLocal('l2_access_token')
        )['roles'] || []
      : [];
  }
}
