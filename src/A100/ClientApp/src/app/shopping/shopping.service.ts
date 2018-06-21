import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../product/product';
import { catchError, map, tap,last } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class ShoppingService {

  private _baseUrl: string;
  private cartQuantitySource = new BehaviorSubject(0);
  currentCartQuantity = this.cartQuantitySource.asObservable();

  private _addProductToShoppingCart: string = "api/ShoppingCart/Add/";
  private _getProductsFromShoppingCart: string = "api/ShoppingCart/Products";
  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    //this.updateCartQuantity(); 
  }

  updateCartQuantity() {
    this._http.get<Product[]>(this._baseUrl + this._getProductsFromShoppingCart).subscribe(products => {
      this.log(`getting products from shopping cart`);
      this.cartQuantitySource.next(products.length);
    });
  }

  addProductToCart(product: Product) {
    this._http.post(this._baseUrl + this._addProductToShoppingCart + product.id, product, httpOptions).subscribe(x => {
      this.log(`added Product To Shopping Cart`);
      this.updateCartQuantity();
    });    
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); //log to console instead       
      this.log(`${operation} failed: ${error.message}`);
      return Observable.throw(error || 'Server error');
    };
  }
  private log(message: string) {
    console.log("Shopping Service " + message);
  }
}
