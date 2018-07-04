import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout-shippinginfo',
  templateUrl: './checkout-shippinginfo.component.html',
  styleUrls: ['./checkout-shippinginfo.component.sass']
})
export class CheckoutShippinginfoComponent implements OnInit {

  shippingInfoForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.shippingInfoForm = this.formBuilder.group({
      contact: this.formBuilder.group({
          FirstName: '',
          LastName: '',
          Email: '',
          Phone: ''
      }),
      shippingAddress: this.formBuilder.group({
        Street: '',
        City: '',
        State: '',
        Zip: ''
      })
    });
  }
  onSubmit() {
   console.log(this.shippingInfoForm);
    this.router.navigate(['checkout/payment']);
  }
}
