import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  onConnect$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor() { }

  connect() {
    this.onConnect$.next(true);
  }

  disconnect() {
    this.onConnect$.next(false);
  }
}
