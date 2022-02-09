import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/firebase/customer.service';
import Swal from 'sweetalert2';
import { CustomerFormComponent } from './customer-form/customer-form.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: any[]=[];
  
  constructor(
    private customerService: CustomerService, 
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().then((data)=>{
      data.forEach((element: any) => {
        this.customers.push({... element.data()});
      });
    });
  }

  createCustomer(){
    let doi="";
    Swal.fire({
      title: '¿Que tipo de cliente desea crear?',
      icon: 'warning',
      iconColor: '#a6a6a6',
      showDenyButton: true,
      denyButtonColor: '#45a145',
      confirmButtonText: 'Persona Natural',
      denyButtonText: 'Persona Juridica',
    }).then((result) => {
      if (result.isConfirmed) {
        doi = "1";
      }else if (result.isDenied){
        doi = "6";
      }
      if(doi.length >= 1){
        this.customerService.createCustomer(doi, false);
        const dialogConf = new MatDialogConfig();
        dialogConf.disableClose = true;
        dialogConf.autoFocus = true;
        dialogConf.width = "55%";
        this.dialog.open(CustomerFormComponent, dialogConf);
      }
    })
  }
  
  updateCustomer(customer: any){

  }

  readCustomer(customer: any){

  }

  deleteCustomer(customer: any){

  }

  copyCustomerDOI(doi: string){

  }
}
