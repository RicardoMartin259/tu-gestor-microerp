import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment'; 
import { initializeApp } from 'firebase/app';
import { setDoc, doc, collection, getFirestore, getDocs, deleteDoc, where, query } from 'firebase/firestore';

const app = initializeApp(environment.firebase);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customer: any  = <any>{};

  private customerObj = new BehaviorSubject<any>(this.customer);
  custChange = this.customerObj.asObservable();

  private _mood= new BehaviorSubject<boolean>(false);
  _moodChange = this._mood.asObservable();

  private _custDoc= new BehaviorSubject<string>('');
  _custDocChange = this._custDoc.asObservable();

  constructor() { }

  async saveDoc(customer: any){
    await setDoc(doc(db, "customers", customer.numDoc), customer);
    this.customer = null;
  }

  async getCustomers(): Promise<any>{
    //const q = query(collection(db, "customers"), where("tipoDoc","==","6"));
    const r = query(collection(db, "customers"));
    const querySnapshot = await getDocs(r);
    return querySnapshot;
  }

  async deleteCustomer(cust: string){
    await deleteDoc(doc(db, "customers", cust));
  }

  createCustomer(tipoDoc:string, mood: boolean){
    this._mood.next(mood);
    this._custDoc.next(tipoDoc);
  }
}
