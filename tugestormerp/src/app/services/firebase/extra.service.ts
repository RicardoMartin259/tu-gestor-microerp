import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {
  
  constructor(private firestore: Firestore) { }

  getMessures(){
    const coll = collection(this.firestore, "messureunt");
    return collectionData(coll);
  }
}
