import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  maxDay$: ReplaySubject<number> = new ReplaySubject(1);

  _db: DbService<any>;
  constructor(
    private firestore: Firestore,
  ) {
    this._db = new DbService<any>(this.firestore);
    this._db.use("configs");
    this.readDay().subscribe(config => {
      if (!config) {
        this.maxDay$.next(0);
        return;
      }

      this.maxDay$.next(config.day)
    });
  }

  readDay(): Observable<any> {
    return this._db.read("active_day");
  }
}
