import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingService } from './shopping.service';
import { FormsModule } from '@angular/forms';
import { CheckoutContactComponent } from './checkout-contact/checkout-contact.component';

@NgModule({
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    FormsModule
  ],
  declarations: [
    ShoppingCartComponent,
    CheckoutContactComponent
  ],
  providers: [ShoppingService]
})
export class ShoppingModule { }
