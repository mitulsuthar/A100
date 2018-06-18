import { Component, OnInit, Inject } from '@angular/core';
import { Product, IProduct } from '../product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
 
export class ProductListComponent implements OnInit {
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

