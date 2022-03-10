import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/firebase/product.service';
import { of } from 'rxjs';
import { ExtraService } from 'src/app/services/firebase/extra.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productform: FormGroup;
  messures: any = [];
  //product: any = {};
  product: {[k: string]: any} = {};
  
  constructor(
    private productService: ProductService,
    private extraService: ExtraService,
    private formbuilder: FormBuilder,
    private dialog: MatDialogRef<ProductFormComponent>
  ) { 
    this.productform = this.formbuilder.group({
      prodID: ['', Validators.required],
      prodType: ['', Validators.required],
      desc: ['', Validators.required],
      messureUnd: ['', Validators.required],
      salePrc: [, Validators.required],
      igv: [18, Validators.required],
      purchasePrc: [, Validators.required],
    });

    this.getMessures();
  }

  getMessures(){
    this.extraService.getMessures().subscribe((data)=>{
      this.messures = [];
      data.forEach((element: any) => {
        this.messures.push(element);
      });
      this.messures.sort((a:any, b:any) => (a.desc > b.desc) ? 1 : ((b.desc > a.desc) ? -1 : 0));
    });
  }

  ngOnInit(): void {
  }

  saveProduct(){
    this.product = this.productform.value;
    this.product.status = "A";
    let id = "";
    this.productService.saveProduct(this.product).then(data => {
      id = data.id;
      if(id.length != 0){
        this.showAlertSuccess();
      }
    });
    
    this.closeForm();
  }

  showAlertSuccess(){
    Swal.fire({
      icon: 'success',
      title: 'Se creó el producto',
    });
  }

  closeForm(){
    this.productform.reset();
    this.dialog.close();
  }
}
