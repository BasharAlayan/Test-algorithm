import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {Data} from '../model/data';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private dbPath = '/Result';
  dataRef: AngularFireList<Data> = null;

  constructor(private db: AngularFireDatabase,
  ) {
    this.dataRef = db.list(this.dbPath);
  }

  getById(id): AngularFireObject<Data[]> {
    return this.db.object('/Result/' + id);
  }
  getAll(): AngularFireList<Data> {
    return this.dataRef;
  }

}
