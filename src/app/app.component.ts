import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navHeight: number = 0;

  constructor(
    private cdref: ChangeDetectorRef
  ) {}

  setNavHeight(h: number) {
    this.navHeight = h+30;
    this.cdref.detectChanges();
  }
}
