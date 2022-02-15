import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/firebase/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[] = [
    {id:'123', desc:'prod 1', messure: 'balde'},
    {id:'113', desc:'prod 2', messure: 'unidad'},
    {id:'133', desc:'prod 3', messure: 'litro'},
    {id:'122', desc:'prod 4', messure: 'us galon'},
  ];

  prods: any [] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.readProducts();
  }

  createForm(){

  }

  readProducts(){
    let prods = this.productService.getProducts().then(element=>{
      console.log("llega");
      console.log(element);
    });
    console.log(prods);
  }

  updateProduct(product: any){
    Swal.fire({
      icon: 'success',
      title: '¡El producto ha sido actualizado!',
    });
  }

  deleteProduct(prodID: string){
    Swal.fire({
      icon: 'success',
      title: '¡El producto ha sido eliminado!',
    });
  }  
}
