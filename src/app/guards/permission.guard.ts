import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/security/session.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionGuard implements CanActivateChild {

    constructor(private _router: Router, private _sessionService: SessionService) { }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let permissions: string[] = childRoute.data.permissions;
        if (permissions.indexOf(sessionStorage.getItem('permission')) === -1) {
            this._router.navigateByUrl('error500');
            return false;
        }
        return true;
    }
}