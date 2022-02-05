import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DbService } from './db.service';

export interface Vote {
  id?: string,
  submission_id: string
  address: string,
  weight: number,
  type: string
}

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  _db: DbService<Vote>;
  constructor(
    private firestore: Firestore,
  ) {
    this._db = new DbService<Vote>(firestore);
    this._db.use("votes");
  }

  all(querray: any[][] = [[]]): Observable<Vote[]> {
    return this._db.all(querray);
  }

  read(id: string): Observable<Vote> {
    return this._db.read(id);
  }

  create(vote: Vote) {
    return this._db.create(vote);
  }

  delete(vote: Vote) {
    return this._db.delete(vote);
  }

  update(vote: Vote) {
    return this._db.update(vote.id, { submission_id: vote.submission_id });
  }
}
