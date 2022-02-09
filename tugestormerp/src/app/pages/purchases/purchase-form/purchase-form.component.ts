import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PurchaseService } from 'src/app/services/firebase/purchase.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.css']
})
export class PurchaseFormComponent implements OnInit {

  purchaseForm: FormGroup;
  purchase:any = <any>{};

  constructor(
    private formBuilder: FormBuilder,
    private dialog:MatDialogRef<PurchaseFormComponent>,
    private purchaseService: PurchaseService
  ) { 
    this.purchaseForm = this.formBuilder.group({
      invoiceType: ['', Validators.required],
      invoiceSerie: ['', Validators.required],
      supplierDOI: ['', Validators.required],
      registerDate: ['', Validators.required],
      expireDate: ['', Validators.required],
      deliverDate: ['', Validators.required],
      currency: ['', Validators.required],
      amount: ['', Validators.required],
      paymentType: ['', Validators.required],
      status: ['', Validators.required],
      aditional: ['', ],
    });
      
  }

  ngOnInit(): void {
      
  }

  submitPurchase(){
    this.purchase = {
      invoiceType: this.purchaseForm.value.invoiceType,
      invoiceSerie: this.purchaseForm.value.invoiceSerie,
      supplierDOI: this.purchaseForm.value.supplierDOI,
      registerDate: new Date(),
      expireDate: this.purchaseForm.value.expireDate,
      deliverDate: this.purchaseForm.value.deliverDate,
      currency: this.purchaseForm.value.currency,
      amount: this.purchaseForm.value.amount,
      paymentType: this.purchaseForm.value.paymentType,
      status: this.purchaseForm.value.status,
      aditional: this.purchaseForm.value.aditional,
    }
    this.purchaseService.createDoc(this.purchase);
    this.showSuccessAlert();
    this.closeForm();
  }

  closeForm(){
    this.purchaseForm.reset();
    this.dialog.close();
  }

  showSuccessAlert(){
    Swal.fire({
      icon: 'success',
      title: 'Se grabó la compra',
      showConfirmButton: false,
      showCancelButton: false,
      timer: 2000
    })
  }
}
