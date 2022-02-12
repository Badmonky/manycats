import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ConfigService } from './services/data/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  navHeight: number = 0;

  constructor(
    private cdref: ChangeDetectorRef,
    private auth: AuthService
  ) { }

  get small() {
    return window.innerWidth < 752;
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
