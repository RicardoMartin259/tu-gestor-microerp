import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/firebase/product.service';
import Swal from 'sweetalert2';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any = {};

  constructor(private productService: ProductService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProductData();
  }

  productEmpty(): boolean{
    return Object.keys(this.product).length === 0
  }

  getProductData(){
    this.productService.productChange.subscribe((e)=>{
      this.product = e;
    });
  }

  updateProduct(prod: any){
    this.productService.createFormMode(true);
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    dialogConf.autoFocus = true;
    dialogConf.width = "55%";
    this.dialog.open(ProductFormComponent, dialogConf);
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
    this.productService.disableProduct(prod);
    this.product={};
  }
}
