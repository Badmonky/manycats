import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  _alerts: any[] = [];
  alerts$: ReplaySubject<any[]> = new ReplaySubject(1);

  constructor() {
    this.alerts$.next(this._alerts);
  }

  dismiss(id: string) {
    this._alerts = this._alerts.filter(a => a.id !== id);
    this.alerts$.next(this._alerts);
  }

  _makeAlert(text: string, type: string) {
    const id = uuid.v4();
    this._alerts.push({
      id, text, type
    });
    this.alerts$.next(this._alerts);
    setTimeout(() => {
      this.dismiss(id);
    }, 5000);
  }

  warning(text: string) {
    this._makeAlert(text, "warning");
  }

  success(text: string) {
    this._makeAlert(text, "success");
  }

  error(text: string) {
    this._makeAlert(text, "error");
  }
}
