import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShippingInfo } from '../models/ShippingInfo';
import { CheckoutService } from '../checkout.service';
@Component({
  selector: 'app-checkout-shippinginfo',
  templateUrl: './checkout-shippinginfo.component.html',
  styleUrls: ['./checkout-shippinginfo.component.css']
})
export class CheckoutShippinginfoComponent implements OnInit {

  form: FormGroup;
  private formSumitAttempt: boolean;
  constructor(private formBuilder: FormBuilder, private router: Router, private checkoutService: CheckoutService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      contact: this.formBuilder.group({
          FirstName: ['', Validators.required],
          LastName: ['', Validators.required],
          Email: ['', [Validators.required, Validators.email]],
          Phone:  ['', [Validators.required, Validators.pattern('^\\d{10}$')]]
      }),
      shippingAddress: this.formBuilder.group({
        Street: ['', Validators.required],
        City: ['', Validators.required],
        State: ['', Validators.required],
        Zip: ['', Validators.required]
      })
    });
  }
  isFieldValid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSumitAttempt)
    );
  }
  onSubmit() {
   this.formSumitAttempt = true;
   if (this.form.valid) {
     console.log(this.form.value);
     const shippinginfo = <ShippingInfo>this.form.value;
     console.log(shippinginfo);
     this.checkoutService.insertShippingInfo(shippinginfo).subscribe(result => {
        console.log(result);
        this.router.navigate(['checkout/payment']);
     });
   }
  }
}
