import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Submission {
  id?: string,
  address: string,
  text: string,
  day: number
}

const _mock = {id: "asdas", address: "asdasd", text: "asdasda", day: 1}

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor() {}

  all(querray: any[][] = [[]]): Observable<Submission[]> {
    return of([
      _mock
    ])
  }

  read(id: string): Observable<Submission> {
    return of(_mock)
  }

  create(submission: Submission) {
    return of({})
  }

  delete(submission: Submission) {
    return of({});
  }

  update(submission: Submission) {
    return of({})
  }
}
