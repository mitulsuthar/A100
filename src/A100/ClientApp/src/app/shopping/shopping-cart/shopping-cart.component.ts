import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shopping.service';
import { Product } from '../../product/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {
  public products: Product[];
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.shoppingService.getProductsFromShoppingCart().subscribe(products => this.products = products);
  }
  removeFromCart(product: Product) {
    this.shoppingService.removeProductFromCart(product).subscribe(x => {
      const index: number = this.products.indexOf(product);
      if (index !== -1) {
          this.products.splice(index, 1);
      }
    });
  }
}
