import { Component, OnInit, Input } from '@angular/core';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-cart-widget',
  templateUrl: './shopping-cart-widget.component.html',
  styleUrls: ['./shopping-cart-widget.component.sass']
})
export class ShoppingCartWidgetComponent implements OnInit {
  quantity: number;
  constructor(private shoppingService: ShoppingService) {
    this.quantity = 1;
  }

  ngOnInit() {
    this.shoppingService.currentCartQuantity.subscribe(quantity => this.quantity = quantity);
  }

}
