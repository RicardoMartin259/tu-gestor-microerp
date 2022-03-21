import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/firebase/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  products: any [] = [];
  prod: any = {};

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(data=>{
      this.products = [];
      data.forEach((element: any) => {
        this.products.push(element);
      });
    });
  }

  showProductDetails(product: any){
    this.productService.passProductDetails(product);
  }
}
