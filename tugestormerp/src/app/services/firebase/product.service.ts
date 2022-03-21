import { Injectable } from '@angular/core';
import { collection, collectionData, 
         where, doc, Firestore, query, setDoc, updateDoc,  } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private collname = "products";
  private product: any  = <any>{};

  private productObj = new BehaviorSubject<any>(this.product);
  productChange = this.productObj.asObservable();

  private _mode= new BehaviorSubject<boolean>(false);
  _modeChange = this._mode.asObservable();

  constructor(private firestore: Firestore) { }

  getProducts(){
    const coll = collection(this.firestore, this.collname);
    const queryActive = query(coll, where("status", "==", "A"));
    return collectionData(queryActive, { idField: 'propertyId' });
  }

  async saveProduct(prod: any): Promise<any>{
    return await addDoc(collection(this.firestore, this.collname), prod);
  }

  createFormMode(mode: boolean){
    this._mode.next(mode);
  }

  passProductDetails(product: any){
    this.productObj.next(product);
  }

  async updateProduct(prod: any){
    const { propertyId, ...rest } = prod;
    const prodObj = rest;
    return await updateDoc(doc(this.firestore, this.collname, propertyId), prodObj);
  }

  async disableProduct(prod: any){
    const { propertyId, ...rest } = prod;
    const prodObj = rest;
    await updateDoc(doc(this.firestore, this.collname, propertyId), prodObj);
  }

}
