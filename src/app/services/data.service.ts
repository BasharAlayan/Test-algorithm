import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Data} from '../model/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dbPath = '/test';
  dataRef: AngularFireList<Data> = null;

  constructor(private db: AngularFireDatabase) {
    this.dataRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Data> {
    return this.dataRef;
  }

  update(key: string, value: any): Promise<void> {
    return this.dataRef.update(key, value);
  }
}
