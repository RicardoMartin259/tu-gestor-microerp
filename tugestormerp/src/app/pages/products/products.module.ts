import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsComponent } from './products.component';
import { AngularMaterialModule } from 'src/app/shared/material/angular-material/angular-material.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductFormComponent,
    ProductDetailsComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
