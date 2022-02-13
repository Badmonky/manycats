import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DbService } from './db.service';

export interface Story {
  id?: string,
  address: string,
  text: string,
  day: number,
}

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  _db: DbService<Story>;
  constructor(
    private firestore: Firestore,
  ) {
    this._db = new DbService<Story>(firestore);
    this._db.use("stories");
  }

  all(querray: string[][] = [[]]): Observable<Story[]> {
    return this._db.all(querray);
  }

  read(id: string): Observable<Story> {
    return this._db.read(id);
  }

  create(story: Story) {
    return this._db.create(story);
  }

  delete(story: Story) {
    return this._db.delete(story);
  }

  update(story: Story) {
    return this._db.update(story.id, { text: story.text });
  }
}
