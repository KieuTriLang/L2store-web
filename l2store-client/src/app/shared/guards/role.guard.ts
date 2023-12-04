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
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const exceptedRoles: any[] = route.data['roles'];
    const userRoles: any[] = this.storageService.getRoles();

    if (
      exceptedRoles.filter((role: any) => userRoles.indexOf(role) >= 0).length >
      0
    ) {
      return true;
    } else {
      this.router.navigate(['/explore']);
      return false;
    }
  }
}
