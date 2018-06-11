import { Component, OnInit } from '@angular/core';
import { Product, IProduct } from '../product';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css']
})
export class ProductInsertComponent implements OnInit {

  public product: IProduct;
  constructor() {
    this.product = new Product("",0);
  }


  onProductSave(product: IProduct) {
    console.log(JSON.stringify(product));
  }
  ngOnInit() {
  }

}
