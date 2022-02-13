import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import moment from 'moment';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { CountdownService } from '../countdown.service';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  maxDay$: ReplaySubject<number> = new ReplaySubject(1);

  _db: DbService<any>;
  constructor(
    private firestore: Firestore,
    private count: CountdownService
  ) {
    this._db = new DbService<any>(this.firestore);
    this._db.use("configs");
    this.readDay().subscribe(config => {
      if (!config) {
        return;
      }

      if (!((config.day || config.day === 0) && config.start_date && config.runtime_hours)) {
        return;
      }

      const start = moment(config.start_date.toDate()).utc();
      if (moment().utc() < start) {
        return;
      }

      this.count.init(start, config.runtime_hours);
      this.maxDay$.next(config.day)
    });
  }

  readDay(): Observable<any> {
    return this._db.read("active_day");
  }
}
