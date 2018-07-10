import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingService } from './shopping.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutConfirmationComponent } from './checkout-confirmation/checkout-confirmation.component';
import { CheckoutShippinginfoComponent } from './checkout-shippinginfo/checkout-shippinginfo.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CheckoutService } from './checkout.service';

@NgModule({
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    ShoppingCartComponent,
    CheckoutComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    CheckoutConfirmationComponent,
    CheckoutShippinginfoComponent
  ],
  providers: [ShoppingService, CheckoutService]
})
export class ShoppingModule { }
