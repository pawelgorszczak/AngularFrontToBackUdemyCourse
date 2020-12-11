import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
    
    constructor(private router: Router, private afAuth: AngularFireAuth) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.afAuth.authState.pipe(map(
            auth => {
                if (!auth) {
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
        }));
    }
}