import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductInsertComponent } from './product/product-insert/product-insert.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductDeleteComponent } from './product/product-delete/product-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductInsertComponent,
    ProductDetailsComponent,
    ProductDeleteComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'products/insert', component: ProductInsertComponent },
      { path: 'products/edit/:id', component: ProductEditComponent },
      { path: 'products/details/:id', component: ProductDetailsComponent },
      { path: 'products/delete/:id', component: ProductDeleteComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
