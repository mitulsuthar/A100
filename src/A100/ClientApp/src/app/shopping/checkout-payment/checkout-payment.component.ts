import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutService } from '../checkout.service';
import { PaymentInfo } from '../models/PaymentInfo';

function expirationDateValidator(control: AbstractControl): {[key: string]: boolean} | null {
  const expirationMonth = control.get('ExpirationMonth');
  const expirationYear = control.get('ExpirationYear');
  if (expirationMonth.pristine || expirationYear.pristine) {
    return null;
  }
  if (expirationYear.dirty && expirationMonth.dirty) {
      const currentYear = (new Date()).getFullYear();
      const currentMonth = (new Date()).getMonth();
      if (expirationYear.value === currentYear && expirationMonth.value < currentMonth) {
        return {'expirationDate' : true};
      } else {
        return null;
      }
  }
  return {'expirationDate' : true};
}

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.sass']
})
export class CheckoutPaymentComponent implements OnInit {
  cardTypes: string[] = ['VISA', 'DISCOVER', 'MASTERCARD', 'AMEX'];
  months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  form: FormGroup;
  years: number[];
  private formSumitAttempt: boolean;
  getYears(): number[] {
    const yrs = new Array<number>();
    const currentYear = (new Date()).getFullYear();
    for (let i = currentYear; i < currentYear + 10; i++) {
      yrs.push(i);
    }
    return yrs;
  }
  constructor(private formBuilder: FormBuilder, private router: Router, private checkoutservice: CheckoutService) {
    this.createForm();
  }

  ngOnInit() {
    this.years = this.getYears();
  }

  createForm() {
    this.form = this.formBuilder.group({
      cardInfo: this.formBuilder.group({
        NameOnCard: ['', Validators.required],
        CardNumber: ['', [Validators.required, Validators.pattern('^\\d*$')]],
        CardType: ['', Validators.required],
        SecurityCode: ['', [Validators.required, Validators.pattern('^\\d{3}$')]],
        ExpirationDate: this.formBuilder.group({
          ExpirationMonth: ['', Validators.required],
          ExpirationYear: ['', Validators.required]
        }, { validator: expirationDateValidator})
      }),
      billingAddress: this.formBuilder.group({
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
     const paymentInfo = <PaymentInfo>this.form.value;
     console.log(paymentInfo);
     this.checkoutservice.insertPaymentInfo(paymentInfo).subscribe(result => {
        console.log(result);
        this.router.navigate(['checkout/review']);
     });
    }
  }
}
