import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from '../checkout.service';
import { ReviewOrder } from '../models/ReviewOrder';
import { ShoppingCartProduct } from '../models/shoppingCartProduct';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit {

  reviewOrder: ReviewOrder;
  orderTotal: number;
  constructor( private router: Router, private checkoutservice: CheckoutService) { }

  ngOnInit() {
     this.checkoutservice.getOrderInfo().subscribe(order => {
       this.reviewOrder = order;
       console.log(this.reviewOrder);
        this.orderTotal = this.getOrderTotal(order.shoppingCartProducts);
     });
  }

  getOrderTotal(products: ShoppingCartProduct[]): number {
    let total = 0.0;
    for (let i = 0; i < products.length; i++) {
      total += products[i].price * products[i].quantity;
    }
    return total;
  }
  submitOrder(): void {
    this.checkoutservice.submitOrder().subscribe(result => {
      console.log(result);
      this.router.navigate(['/checkout/confirmation']);
    });
  }
}
