import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  maxDay$: ReplaySubject<number> = new ReplaySubject(1);

  constructor() {
    this.maxDay$.next(1);
  }
}
