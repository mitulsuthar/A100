import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public products: Product[];
  constructor(private productService: ProductService) {
    console.log(productService);
  }
  ngOnInit() {
    this.productService.getProducts().subscribe(result => {
      this.products = result;
    }, error => console.log(error));
  }
}
