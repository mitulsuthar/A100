import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { minvalueValidatorDirective } from './shared/minvalue-validator.directive';
import { ProductModule } from './product/product.module';
import { AboutComponent } from './about/about.component';
import { ShoppingCartWidgetComponent } from './shopping/shopping-cart-widget/shopping-cart-widget.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ShoppingService } from './shopping/shopping.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,        
    minvalueValidatorDirective,
    AboutComponent,
    ShoppingCartWidgetComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AngularFontAwesomeModule,
    NgxPaginationModule,
    ProductModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'about', component: AboutComponent, pathMatch: 'full' },
    ])
  ],
  providers: [ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
