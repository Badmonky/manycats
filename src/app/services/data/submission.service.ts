import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DbService } from './db.service';

export interface Submission {
  id?: string,
  address: string,
  text: string,
  day: number
}

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  _db: DbService<Submission>;
  constructor(
    private firestore: Firestore,
  ) {
    this._db = new DbService<Submission>(firestore);
    this._db.use("submissions");
  }

  all(querray: any[][] = [[]]): Observable<Submission[]> {
    return this._db.all(querray);
  }

  read(id: string): Observable<Submission> {
    return this._db.read(id);
  }

  create(submission: Submission) {
    return this._db.create(submission);
  }

  delete(submission: Submission) {
    return this._db.delete(submission);
  }

  update(submission: Submission) {
    return this._db.update(submission.id, { text: submission.text });
  }
}
