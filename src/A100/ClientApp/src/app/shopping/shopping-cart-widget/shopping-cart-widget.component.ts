import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-widget',
  templateUrl: './shopping-cart-widget.component.html',
  styleUrls: ['./shopping-cart-widget.component.sass']
})
export class ShoppingCartWidgetComponent implements OnInit {
  @Input() quantity: number;
  constructor() {
    this.quantity = 1;
  }

  ngOnInit() {
  }

}
