import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  onScroll$: ReplaySubject<string> = new ReplaySubject(1);

  constructor() { }

  scrollTo(id: string) {
    this.onScroll$.next(id);
  }
}
