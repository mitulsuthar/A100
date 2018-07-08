import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

function expirationDateValidator(control: AbstractControl): {[key: string]: boolean} | null {
  const expirationMonth = control.get('ExpirationMonth');
  const expirationYear = control.get('ExpirationYear');
  if (expirationMonth.pristine || expirationYear.pristine) {
    return null;
  }
  if (expirationYear.touched && expirationMonth.touched) {
      const currentYear = (new Date()).getFullYear();
      const currentMonth = (new Date()).getMonth();
      if (expirationYear.value === currentYear && expirationMonth.value < currentMonth) {
        return {'expirationDate' : true};
      } else {
        return null;
      }
  } else {
    return null;
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
  paymentInfoForm: FormGroup;
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
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.years = this.getYears();
  }

  createForm() {
    this.paymentInfoForm = this.formBuilder.group({
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
      (!this.paymentInfoForm.get(field).valid && this.paymentInfoForm.get(field).touched) ||
      (this.paymentInfoForm.get(field).untouched && this.formSumitAttempt)
    );
  }
  onSubmit() {
    this.formSumitAttempt = true;
    if (this.paymentInfoForm.valid) {
      this.router.navigate(['checkout/review']);
    }
  }
}
