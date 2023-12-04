import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AnonymousGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isAuthenticated()) {
      const exceptedRoles: any[] = ['ROLE_USER'];
      const userRoles: any[] = this.storageService.getRoles();

      if (
        exceptedRoles.filter((role: any) => userRoles.indexOf(role) >= 0)
          .length > 0
      ) {
        this.router.navigate(['/explore']);
      } else {
        this.router.navigate(['/admin/home']);
      }
    }
    return true;
  }
}
