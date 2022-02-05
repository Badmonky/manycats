import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class MetamaskGuard implements CanActivate {
  isAuthorized: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService,
    private nav: NavigationService
  ) {
    this.auth.onAccountChange$.subscribe((account) => {
      this.isAuthorized = !!account;
      if (this.isAuthorized) {
        this.nav.navigateLast();
        return;
      }

      setTimeout(() => {
        const url = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate([url]));
      }, 100);
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        if (!this.isAuthorized) {
          this.alert.error("Please connect to your Metamask");
        }
        resolve(this.isAuthorized);
      }, 50);
    });
  }

}
