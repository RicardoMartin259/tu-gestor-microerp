import { Injectable } from '@angular/core';
import { collection, collectionData, 
         where, doc, Firestore, query, setDoc, updateDoc,  } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private collname = "products";
  private products: any [] = [];
  private product: any  = <any>{};

  constructor(private firestore: Firestore) { }

  /*getProducts(){
    const collect = collection(this.firestore, this.coll)
    const colldelta = collectionChanges(collect);
    const colldata = collectionData(collect).forEach((element: any) =>{
      console.log(element.desc);
    });
    collectionSnapshots(collect).pipe(map( res => res.map((data:any)=>{
      console.log(data.data());
    })));
  }*/

  getProducts(){
    const coll = collection(this.firestore, this.collname);
    const queryActive = query(coll, where("status", "==", "A"));

    return collectionData(queryActive, { idField: 'propertyId' });
  }

  async saveProduct(prod: any): Promise<any>{
    console.log(prod);
    //await setDoc(doc(this.firestore, this.collname), prod);
    //await addDoc(collection(this.firestore, this.collname), prod);
    return await addDoc(collection(this.firestore, this.collname), prod);
  }

  async updateProduct(prod: any){
    const { propertyId, ...rest } = prod;
    const prodObj = rest;
    await updateDoc(doc(this.firestore, this.collname, propertyId), prodObj);
  }

  /*async getProducts2(): Promise<any>{
    let products: any [] = [];
    //const q = query(collection(db, coll), where("tipoDoc","==","6"));
    const r = query(collection(db, this.coll));
    return collectionChanges(r).subscribe(res => {
      res.map(r =>{
        let status = false;
        let prod = {
          id: r.doc.id,
          ... r.doc.data()
        }
        if(this.products.length >0){
          for(let element of this.products){
            if(element.id==r.doc.id){
              console.log("Actualizado: "+r.doc.id);
              status = true;
              break;
            }else{ 
            }
          }
        }
        if(status==false){
          this.products.push(prod);
        }
        this.products.sort();
        return this.products;
      });
    });
  }*/

  /*async deleteProduct(prodID: string){
    await deleteDoc(doc(this.firestore, this.collname, prodID));
  }*/

  async disableProduct(prod: any){
    const { propertyId, ...rest } = prod;
    const prodObj = rest;

    await updateDoc(doc(this.firestore, this.collname, propertyId), prodObj);
  }

}
