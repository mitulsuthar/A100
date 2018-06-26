import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingService } from './shopping.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    FormsModule
  ],
  declarations: [
    ShoppingCartComponent
  ],
  providers: [ShoppingService]
})
export class ShoppingModule { }
