
import {throwError as observableThrowError,  BehaviorSubject ,  of ,  Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../product/product';
import { catchError, map, tap, last } from 'rxjs/operators';
import { ShoppingCartProduct } from './models/shoppingCartProduct';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class ShoppingService {

  private _baseUrl: string;
  private cartQuantitySource = new BehaviorSubject(0);
  public currentCartQuantity = this.cartQuantitySource.asObservable();

  private _addProductToShoppingCart = 'api/ShoppingCart/Add/';
  private _removeProductToShoppingCart = 'api/ShoppingCart/Delete/';
  private _getProductsFromShoppingCart = 'api/ShoppingCart/Products';
  private _updateProductInShoppingCart = 'api/ShoppingCart/Update/';
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

  private  updateCartTotalQuantity() {
    this.getProductsFromShoppingCart().subscribe(products => {
      this.log(`getting products from shopping cart`);
      let quantity = 0;
      for (let i = 0; i < products.length; i++) {
        quantity += (products[i]).quantity;
      }
      this.cartQuantitySource.next(quantity);
    });
  }

  addProductToCart(product: Product) {
    this._http.post(this._baseUrl + this._addProductToShoppingCart + product.id, product, httpOptions).subscribe(x => {
      this.log(`added Product To Shopping Cart`);
      this.updateCartTotalQuantity();
    });
  }
  removeProductFromCart(product: ShoppingCartProduct): Observable<any> {
    return this._http.post(this._baseUrl + this._removeProductToShoppingCart + product.id, product, httpOptions)
    .pipe(
      tap(products => {
        this.log(`fetched products`);
        this.updateCartTotalQuantity();
      }
    ),
      catchError(this.handleError<ShoppingCartProduct>('deleteProduct'))
    );
  }

  updateCartProductQuantity(product: ShoppingCartProduct, quantity: number): Observable<ShoppingCartProduct[]> {
    return this._http.post<ShoppingCartProduct[]>(this._baseUrl + this._updateProductInShoppingCart + product.id + '/' + quantity
    , product , httpOptions)
    .pipe(
      tap(products => {
        this.log(`fetched products`);
        this.updateCartTotalQuantity();
      }
    ),
      catchError(this.handleError<ShoppingCartProduct[]>('deleteProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return observableThrowError(error || 'Server error');
    };
  }
  private log(message: string) {
    console.log('Shopping Service ' + message);
  }
}
