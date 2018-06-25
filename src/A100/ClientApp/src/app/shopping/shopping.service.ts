import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../product/product';
import { catchError, map, tap, last } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartProduct } from './shoppingCartProduct';
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

  private _addProductToShoppingCart = 'api/ShoppingCart/Add/';
  private _removeProductToShoppingCart = 'api/ShoppingCart/Delete/';
  private _getProductsFromShoppingCart = 'api/ShoppingCart/Products';
  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    // this.updateCartQuantity();
  }

  getProductsFromShoppingCart(): Observable<ShoppingCartProduct[]> {
    return this._http.get<ShoppingCartProduct[]>(this._baseUrl + this._getProductsFromShoppingCart)
      .pipe(
        tap(products => this.log(`fetched products`)),
        catchError(this.handleError('getProducts', []))
      );
  }

  updateCartQuantity() {
    this.getProductsFromShoppingCart().subscribe(products => {
      this.log(`getting products from shopping cart`);
      let quantity = 0;
      for (var i = 0; i < products.length; i++) {
        quantity += (products[i]).quantity;
      }
      this.cartQuantitySource.next(quantity);
    });
  }

  addProductToCart(product: Product) {
    this._http.post(this._baseUrl + this._addProductToShoppingCart + product.id, product, httpOptions).subscribe(x => {
      this.log(`added Product To Shopping Cart`);
      this.updateCartQuantity();
    });
  }
  removeProductFromCart(product: ShoppingCartProduct): Observable<any> {
    return this._http.post(this._baseUrl + this._removeProductToShoppingCart + product.id, product, httpOptions)
    .pipe(
      tap(products => {
        this.log(`fetched products`);
        this.updateCartQuantity();
      }
    ),
      catchError(this.handleError<ShoppingCartProduct>('deleteProduct'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return Observable.throw(error || 'Server error');
    };
  }
  private log(message: string) {
    console.log('Shopping Service ' + message);
  }
}
