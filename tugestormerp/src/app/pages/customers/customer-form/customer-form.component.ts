import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/firebase/customer.service';
import { DoiApiService } from 'src/app/services/other-apis/doi-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  tipoPersona = '';
  customerform: FormGroup;
  customerDNIForm: FormGroup;
  customer:any = <any>{};
  customerDNI: any = <any>{};

  constructor(
    private api_ruc_dni: DoiApiService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    public dialog:MatDialogRef<CustomerFormComponent>
    ) { 
      this.customerDNIForm = this.formBuilder.group({
        tipoDoc: ['1', Validators.required],
        numDoc: ['', Validators.required],
        nombres: ['', Validators.required],
        apellidoP: ['', Validators.required],
        apellidoM: ['', Validators.required],
        telefono: ['', Validators.required],
      });
      this.customerform = this.formBuilder.group({
        tipoDoc: ['6', Validators.required],
        numDoc: ['', Validators.required],
        rznSocial: ['', Validators.required],
        direccion: ['', Validators.required],
        contact: ['', Validators.required],
        contactPhone: ['', Validators.required],
      });
      
    }

  ngOnInit(): void {
    let _y = this.customerService._moodChange.subscribe(e=>{
      if(e){
        let _z = this.customerService._custDocChange.subscribe(e=>{
          this.getCustomerData();
          this.tipoPersona = e;
          if(e=="6"){
            this.fillCustRUCForm(this.customer);
          }else if(e=="1"){
            this.fillCustDNIForm(this.customerDNI);
          }
        });
        _z.unsubscribe();
      }else{
        //this.customerform.reset();
        let _w = this.customerService._custDocChange.subscribe(e=>{
          this.tipoPersona = e;
        });
        _w.unsubscribe();
      }
    });
    _y.unsubscribe();
  }

  onSerachRucDni(tipoDoc:string, numDoc:string){
    if(tipoDoc=="6"){
      if(numDoc != null && numDoc.length == 11){
        this.api_ruc_dni.consultarRUC(numDoc).subscribe(data=>{
          //completar interface
          this.customer = {
            "tipoDoc": "6",
            "numDoc": data.ruc,
            "rznSocial": data.razonSocial,
            "address": {
                "direccion": data.direccion,
                "provincia": data.provincia,
                "departamento": data.departamento,
                "distrito": data.distrito,
                "ubigueo": data.ubigeo,
            },
            "contacto": '',
            "telefono": '',
          }
          //llenar formulario
          this.fillCustRUCForm(this.customer);
        });
      }
    }else if(tipoDoc=="1"){
      if(numDoc != null && numDoc.length == 8){
        this.api_ruc_dni.consultarDNI(numDoc).subscribe(data=>{
          //completar interface
          this.customerDNI = {
            "tipoDoc": "1",
            "numDoc": data.dni,
            "nombres":data.nombres,
            "apellidoPaterno":data.apellidoPaterno,
            "apellidoMaterno":data.apellidoMaterno,
            "codVerifica":data.codVerifica,
            "telefono": '',
          }
          //llenar formulario
          this.fillCustDNIForm(this.customerDNI);
        });
      }
    }
  }

  onSaveCustomer(custumer:any){
    //Complete contact info
    if(custumer.tipoDoc=="6"){
      this.customer.contacto = this.customerform.value.contact;
      this.customer.telefono = this.customerform.value.contactPhone;
    }else{
      this.customerDNI.telefono = this.customerDNIForm.value.telefono;
    }
    //Write in firebase
    this.customerService.saveDoc(custumer);
    this.closeForm();
    this.showConfirm();
  }

  closeForm(){
    this.customerform.reset();
    this.dialog.close();
  }

  showConfirm(){
    Swal.fire({
      icon: 'success',
      title: '¡El cliente ha sido guardado!',
    })
  }

  getCustomerData(){
    let _x = this.customerService.custChange.subscribe((e)=>{
      if(e.tipoDoc=="6"){
        this.customer= <any>e;
      }else{
        this.customerDNI = <any>e;
      }
    });
    _x.unsubscribe()
  }

  fillCustRUCForm(customer: any){
    this.customerform.setValue({
      "tipoDoc": customer.tipoDoc,
      "numDoc": customer.numDoc,
      "rznSocial": customer.rznSocial,
      "direccion": customer.address.direccion,
      "contact": customer.contacto,
      "contactPhone": customer.telefono,
    });
  }

  fillCustDNIForm(customer: any){
    this.customerDNIForm.setValue({
      "tipoDoc": customer.tipoDoc,
      "numDoc": customer.numDoc,
      "nombres": customer.nombres,
      "apellidoP": customer.apellidoPaterno,
      "apellidoM": customer.apellidoMaterno,
      "telefono": customer.telefono,
    });
  }

}
