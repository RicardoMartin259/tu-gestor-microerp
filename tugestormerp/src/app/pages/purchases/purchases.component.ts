import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PurchaseService } from 'src/app/services/firebase/purchase.service';
import Swal from 'sweetalert2';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  ELEMENT_DATA: any[] = [
    {position: 'F080-00008264', name: 'SERCORISAC (SHELL SERVICIOS Y COMERCIALIZADORA RIVERA)', weight: 1.0079, status: 'Pendiente'},
    {position: 'F080-00008264', name: 'DISTRIBUIDORA HERMANOS CARRANZA (CASTROL)', weight: 4.0026, status: 'Pagado'}
  ]

  purchases: any[]=[];
  today = new Date();

  displayedColumns: string[] = ['invoiceSerie', 'supplierDOI', 'amount', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>(this.purchases);

  constructor(
    private purchaseService: PurchaseService, 
    private router: Router,
    private dialog: MatDialog
  ) { }


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(): void {
    this.getPurchases();
  }

  getPurchases(){
    this.purchaseService.getPurchases().then(data =>{
      data.forEach((element: any) => {
        console.log(element.data());
        this.purchases.push({... element.data()});
        console.log('today: '+ this.today.getTime());
        const nDate = new Date(element.data().expireDate.seconds*1000);
        //const nDate = Date.parse(element.data().expireDate);
        console.log('expire: '+ nDate);
        if(this.today<element.data().expireDate.toDate()){
          console.log('tiempo');
        }else{
          console.log('cerrado');
        }
        
      });
    });
  }

  setStatus(status: string){
    var element = document.getElementById("statusI");
    if(status==="P"){
      element?.classList.add('text-danger');
    }else{
      element?.classList.add('text-success');
    }
  }

  openForm(){
    this.purchaseService.createPurchase(false);
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    dialogConf.autoFocus = true;
    dialogConf.width = "55%";
    this.dialog.open(PurchaseFormComponent, dialogConf);
  }


}