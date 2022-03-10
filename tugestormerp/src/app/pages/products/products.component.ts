import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/firebase/product.service';
import Swal from 'sweetalert2';
import { ProductFormComponent } from './product-form/product-form.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any [] = [];
  prod: any = {};

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  createForm(){
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    dialogConf.autoFocus = true;
    dialogConf.width = "55%";
    this.dialog.open(ProductFormComponent, dialogConf);
  }

  getProducts(){
    var prodsList: any = [];
    this.productService.getProducts().subscribe(data=>{
      this.products = [];
      data.forEach((element: any) => {
        this.products.push(element);
      });
    });
    
  }

  updateProduct(product: any){
    Swal.fire({
      icon: 'success',
      title: '¡El producto ha sido actualizado!',
    });
  }

  deleteProduct(prod: any){
    Swal.fire({
      title: '¿Está seguro?',
      text: "No podrá recuperar los datos del producto una vez eliminado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        //Call disable function from productService
        this.disableProduct(prod);
        Swal.fire({
          icon: 'success',
          title: '¡El producto ha sido eliminado!',
        });
      }
    });
  }

  disableProduct(prod: any){
    prod.status = "C";
    console.log(prod);
    this.productService.disableProduct(prod);
  }
}
