import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  _url: string | null = null;

  constructor(
    private router: Router
  ) { }

  currentUrl(url: string | null) {
    this._url = url;
  }

  navigateLast() {
    if (!this._url) {
      return;
    }

    const url = this._url;
    this._url = null;

    this.router.navigateByUrl(url);
  }
}
