import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductInsertComponent } from './product-insert/product-insert.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [{ path: 'products', component: ProductListComponent },
  { path: 'products/insert', component: ProductInsertComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: 'products/details/:id', component: ProductDetailsComponent },
  { path: 'products/delete/:id', component: ProductDeleteComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
