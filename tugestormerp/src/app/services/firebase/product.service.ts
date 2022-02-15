import { Injectable } from '@angular/core';
//import { collection, collectionChanges, collectionData, collectionSnapshots, Firestore, onSnapshot } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { collectionChanges } from 'rxfire/firestore';
import { Observable } from 'rxjs';

const app = initializeApp(environment.firebase);
const db = getFirestore(app);


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private coll = "products";
  private products: any [] = [];
  private product: any  = <any>{};

  constructor() { }

  /*
  getProducts(){
    const collect = collection(this.firestore, this.coll)
    const colldelta = collectionChanges(collect);
    const colldata = collectionData(collect).forEach((element: any) =>{
      console.log(element.desc);
    });
    console.log(collect);
    console.log(colldata);
    console.log(colldelta);
    collectionSnapshots(collect).pipe(map( res => res.map((data:any)=>{
      console.log(data.data());
    })));
  }*/

  async saveProduct(prod: any){
    await setDoc(doc(db, this.coll, prod.numDoc), prod);
    this.product = null;
  }

  async getProducts(): Promise<any>{
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
        /*if(this.products.length >0){
          for(let element of this.products){
            if(element.id==r.doc.id){
              console.log("Actualizado: "+r.doc.id);
              status = true;
              break;
            }else{ 
            }
          }
        }*/
        if(status==false){
          //console.log(prod);
          /*console.log("add")
          console.log(this.products);*/
          this.products.push(prod);
        }
        this.products.sort();
        return this.products;
        //console.log(r.doc.id);
        //console.log(r.doc.data());
      });
    });
  }
  /*async getProducts(): Promise<any>{
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
        /*if(this.products.length >0){
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
          //console.log(prod);
          /*console.log("add")
          console.log(this.products);
          this.products.push(prod);
        }
        this.products.sort();
        return this.products;
        //console.log(r.doc.id);
        //console.log(r.doc.data());
      });
    });
    const changesColls = collectionChanges(r)
    const querySnapshot = await getDocs(r);
    /*console.log(querySnapshot);
    console.log("lista sin ordenar");
    console.log(this.products);*/
    //this.products.sort();
    /*console.log("lista ordenada");
    console.log(this.products);
    //return this.products;
  }*/

  async deleteProduct(prod: string){
    await deleteDoc(doc(db, this.coll, prod));
  }

  createCustomer(){
  }
}
