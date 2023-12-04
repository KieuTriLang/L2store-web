import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class DenyRoleGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const denyRoles: any[] = route.data['roles'];
    const redirect: any = route.data['redirect'];
    const userRoles: any[] = this.storageService.getRoles();

    if (
      denyRoles.filter((role: any) => userRoles.indexOf(role) >= 0).length > 0
    ) {
      this.router.navigate([`${redirect}`]);
      return false;
    } else {
      return true;
    }
  }
}
