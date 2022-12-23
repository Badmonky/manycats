import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Story {
  id?: string,
  address: string,
  text: string,
  day: number,
}


const _mock = {id: "asdas", address: "asdasd", text: "asdasda", day: 1}

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  constructor() {}

  all(querray: any[][] = [[]]): Observable<Story[]> {
    return of([
      _mock
    ])
  }

  read(id: string): Observable<Story> {
    return of(_mock)
  }

  create(submission: Story) {
    return of({})
  }

  delete(submission: Story) {
    return of({});
  }

  update(submission: Story) {
    return of({})
  }
}
