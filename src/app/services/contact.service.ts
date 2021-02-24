import { Injectable } from '@angular/core';
import {Contact} from '../model/contact';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Data} from '../model/data';



@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private dbPath = '/contacts';
  dataRef: AngularFireList<Contact> = null;


  constructor(private db: AngularFireDatabase,
  ) {
    this.dataRef = db.list(this.dbPath);
  }

  add(contactObject: Contact) {
    return this.dataRef.push(contactObject)
  }
}
