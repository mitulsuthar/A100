import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shopping.service';
import { Product } from '../../product/product';
import { ShoppingCartProduct } from '../shoppingCartProduct';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {
  public products: ShoppingCartProduct[];
  public orderTotal: number;
  constructor(private shoppingService: ShoppingService) {
    this.products = new Array<ShoppingCartProduct>();
  }

  ngOnInit() {
    this.getProductsFromShoppingCart();
  }
  getProductsFromShoppingCart() {
        this.shoppingService.getProductsFromShoppingCart().subscribe(products => {
          this.products = products;
          this.orderTotal = this.getOrderTotal(products);
        });
  }

  getOrderTotal(products: ShoppingCartProduct[]): number {
    let total = 0.0;
    for (let i = 0; i < products.length; i++) {
      total += products[i].price * products[i].quantity;
    }
    return total;
  }
  removeFromCart(product: ShoppingCartProduct) {
    this.shoppingService.removeProductFromCart(product).subscribe(x => {
      const index: number = this.products.indexOf(product);
      if (index !== -1) {
          this.products.splice(index, 1);
      }
      this.orderTotal = this.getOrderTotal(this.products);
    });
  }

  onQuantityChanged(product: ShoppingCartProduct, quantityChanged: number) {
    this.shoppingService.updateCartProductQuantity(product, quantityChanged).subscribe(products => {
      this.products = products;
      this.orderTotal = this.getOrderTotal(products);
    });
  }
}
