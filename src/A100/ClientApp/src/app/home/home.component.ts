import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';
import { ShoppingService } from '../shopping/shopping.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public products: Product[];
  
  constructor(private productService: ProductService, private shoppingService: ShoppingService) {
    console.log(productService);
  }
  ngOnInit() {
    this.productService.getProducts().subscribe(result => {
      this.products = result;
    }, error => console.log(error));

  }

  p: number = 1;

  addToCart(product: Product) {
    console.log(product);
    this.shoppingService.addProductToCart(product);
  }
}
