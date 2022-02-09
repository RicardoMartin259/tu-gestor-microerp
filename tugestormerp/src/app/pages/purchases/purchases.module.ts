import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesComponent } from './purchases.component';
import { AngularMaterialModule } from 'src/app/shared/material/angular-material/angular-material.module';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';


@NgModule({
  declarations: [
    PurchasesComponent,
    PurchaseFormComponent,
  ],
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    AngularMaterialModule
  ]
})
export class PurchasesModule { }
