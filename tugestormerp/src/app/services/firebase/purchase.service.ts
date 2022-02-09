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
export class PurchaseService {

  private coll = "purchases";
  private purchase: any  = <any>{};

  private customerObj = new BehaviorSubject<any>(this.purchase);
  custChange = this.customerObj.asObservable();

  private _mood= new BehaviorSubject<boolean>(false);
  _moodChange = this._mood.asObservable();

  private _custDoc= new BehaviorSubject<string>('');
  _custDocChange = this._custDoc.asObservable();

  constructor() { }

  async createDoc(purchase: any){
    await setDoc(doc(db, this.coll, (purchase.supplierDOI+'-'+purchase.invoiceSerie)), purchase);
    this.purchase = null;
  }

  async getPurchases(): Promise<any>{
    const r = query(collection(db, this.coll));
    const querySnapshot = await getDocs(r);
    return querySnapshot;
  }

  async deletePurchase(invoiceNum: string){
    await deleteDoc(doc(db, "customers", invoiceNum));
  }

  createPurchase( mood: boolean){
    this._mood.next(mood);
  }
}
