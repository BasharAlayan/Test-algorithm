import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {Data} from '../model/data';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dbPath = '/test';
  dataRef: AngularFireList<Data> = null;

  constructor(private db: AngularFireDatabase,
              ) {
    this.dataRef = db.list(this.dbPath);
  }

  getById(id): AngularFireObject<Data[]> {
    return this.db.object('/test/' + id);
  }
  getAll(): AngularFireList<Data> {
    return this.dataRef;
  }

  update(key: string, value: any): Promise<void> {
    return this.dataRef.update(key, value);
  }
}
