import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductInsertComponent } from './product-insert/product-insert.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    ProductRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    ProductListComponent,
    ProductEditComponent,
    ProductInsertComponent,
    ProductDetailsComponent,
    ProductDeleteComponent,
  ],
  providers:[ProductService]
})
export class ProductModule { }
