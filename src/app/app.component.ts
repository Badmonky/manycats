import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  navHeight: number = 0;

  constructor(
    private cdref: ChangeDetectorRef,
    private nav: NavigationService,
    private router: Router,
    private auth: AuthService
  ) {
    this.router.events.pipe(
      filter(
        ev => ev instanceof NavigationEnd || ev instanceof NavigationCancel
      )).subscribe((val: any) => {
        if (val instanceof NavigationEnd) {
          this.nav.currentUrl(null);
          return;
        }

        this.nav.currentUrl(val.url);
      });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("eth_conn")) {
      this.auth.connectToMetaMask();
    }
  }

  setNavHeight(h: number) {
    this.navHeight = h + 30;
    this.cdref.detectChanges();
  }
}
