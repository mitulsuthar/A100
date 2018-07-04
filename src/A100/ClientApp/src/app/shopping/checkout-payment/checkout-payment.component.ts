import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.sass']
})
export class CheckoutPaymentComponent implements OnInit {

  paymentInfoForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.paymentInfoForm = this.formBuilder.group({
      NameOnCard: '',
      CardNumber: '',
      CardType: '',
      SecurityCode: '',
      billingAddress: this.formBuilder.group({
        Street: '',
        City: '',
        State: '',
        Zip: ''
      })
    });
  }
  onSubmit() {
   console.log(this.paymentInfoForm);
    this.router.navigate(['checkout/review']);
  }
}
