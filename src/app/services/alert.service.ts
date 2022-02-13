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
    this._alerts = this._alerts.map(a => {
      a.rot *= -1;
      return a;
    }).filter(a => a.id !== id);
    this.alerts$.next(this._alerts);
  }


  _rot = 1;
  _makeAlert(text: string, type: string) {
    if (this._alerts.length === 0) {
      this._rot = -1;
    }

    this._rot *= -1;

    const id = uuid.v4();
    this._alerts.push({
      id, text, type, rot: this._rot
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
