import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingService } from './shopping.service';

@NgModule({
  imports: [
    CommonModule,
    ShoppingRoutingModule
  ],
  declarations: [
    ShoppingCartComponent
  ],
  providers: [ShoppingService]
})
export class ShoppingModule { }
