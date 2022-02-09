import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { AngularMaterialModule } from 'src/app/shared/material/angular-material/angular-material.module';


@NgModule({
  declarations: [
    CustomersComponent,
    CustomerFormComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
