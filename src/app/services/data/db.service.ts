import { collectionData, docData, Firestore, query } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, orderBy, QueryConstraint, Timestamp, updateDoc, where, WhereFilterOp } from 'firebase/firestore';
import { Observable } from 'rxjs';

export class DbService<T> {

  _collection: string = "_something_wrong_";

  constructor(
    private firestore: Firestore
  ) { }

  use(col: string) {
    this._collection = col;
  }

  all(querray: any[][] = [[]]): Observable<T[]> {
    let ref: any = collection(this.firestore, this._collection);
    let wh: QueryConstraint[] = [
      orderBy("created_at", "desc")
    ];

    querray.forEach(q => {
      if (q.length === 3) {
        wh.push(where(q[0], q[1] as WhereFilterOp, q[2]))
      }
    });

    ref = query(ref, ...wh);

    return collectionData(ref, { idField: 'id' }) as Observable<T[]>;
  }

  read(id: string): Observable<T> {
    const colRef = doc(this.firestore, `${this._collection}/${id}`);
    return docData(colRef, { idField: 'id' }) as Observable<T>;
  }

  create(data: T) {
    var ts = Timestamp.fromDate(new Date());
    const colRef = collection(this.firestore, this._collection);

    //@ts-ignore
    data.created_at = ts;
    return addDoc(colRef, data);
  }

  delete(data: T) {
    //@ts-ignore
    const colRef = doc(this.firestore, `${this._collection}/${data.id}`);
    return deleteDoc(colRef);
  }

  update(id: string | undefined, data: any) {
    if (!id) {
      return new Promise((_, reject) => {
        reject();
      });
    }

    const colRef = doc(this.firestore, `${this._collection}/${id}`);

    //@ts-ignore
    data.updated_at = ts;
    return updateDoc(colRef, data);
  }
}
