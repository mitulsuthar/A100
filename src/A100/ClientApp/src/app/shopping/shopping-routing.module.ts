import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutConfirmationComponent } from './checkout-confirmation/checkout-confirmation.component';
import { CheckoutShippinginfoComponent } from './checkout-shippinginfo/checkout-shippinginfo.component';

const routes: Routes = [
{
  path: 'checkout', component: CheckoutComponent, children: [
    { path: '', redirectTo: 'shoppingcart',  pathMatch: 'full'},
    { path: 'shoppingcart', component: ShoppingCartComponent} ,
    { path: 'shippinginfo', component: CheckoutShippinginfoComponent },
    { path: 'payment', component: CheckoutPaymentComponent },
    { path: 'review', component: CheckoutReviewComponent },
    { path: 'confirmation', component: CheckoutConfirmationComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
