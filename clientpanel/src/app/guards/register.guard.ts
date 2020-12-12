import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SettingsService } from "../services/settings.service";

@Injectable({ providedIn: 'root'})
export class RegisterGuard implements CanActivate {
    
    constructor(private router: Router, private settingsSErvice: SettingsService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.settingsSErvice.getSettings().allowRegistration) {
            return true;            
        }
        else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}