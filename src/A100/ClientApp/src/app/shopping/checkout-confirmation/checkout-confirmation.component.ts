import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-confirmation',
  templateUrl: './checkout-confirmation.component.html',
  styleUrls: ['./checkout-confirmation.component.sass']
})
export class CheckoutConfirmationComponent implements OnInit {

  confirmationNumber: number;
  constructor() { }

  ngOnInit() {
    this.confirmationNumber = 23424244;
  }

}
