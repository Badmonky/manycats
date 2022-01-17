import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navHeight: number = 0;

  setNavHeight(h: number) {
    this.navHeight = h+20;
  }
}
