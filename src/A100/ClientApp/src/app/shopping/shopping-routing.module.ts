import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutContactComponent } from './checkout-contact/checkout-contact.component';

const routes: Routes = [{ path: 'shoppingcart', component: ShoppingCartComponent, pathMatch: 'full' },
                        { path: 'shoppingcart/checkout/contact', component: CheckoutContactComponent, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
