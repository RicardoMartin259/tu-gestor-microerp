import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';
import { PurchasesComponent } from './purchases.component';

const routes: Routes = [
  { path: '', component: PurchasesComponent, children: [
    { path: '', component: PurchaseFormComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesRoutingModule { }
