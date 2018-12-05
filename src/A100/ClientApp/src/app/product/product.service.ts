
import {throwError as observableThrowError,  Observable ,  of } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Product } from './product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()

export class ProductService {

  private _baseUrl: string;
  private _productListUrl = 'api/Product/List';
  private _productInsertUrl = 'api/Product/Insert';
  private _productEditUrl = 'api/Product/Edit';
  private _productFindUrl = 'api/Product/Find/';
  private _productDeleteUrl = 'api/Product/Delete/';
  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  getProduct(id: number): Observable<Product> {
    return this._http.get<Product>(this._baseUrl + this._productFindUrl + id)
      .pipe(
        tap(product => this.log(`fetched product`)),
        catchError(this.handleError<Product>('getProduct'))
      );
  }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this._baseUrl + this._productListUrl)
      .pipe(
        tap(products => this.log(`fetched products`)),
        catchError(this.handleError('getProducts', []))
      );
  }

  insertProduct(product: Product): Observable<Product> {
    return this._http.post<Product>(this._baseUrl + this._productInsertUrl, product, httpOptions)
      .pipe(
        tap(products => this.log(`fetched products`)),
        catchError(this.handleError<Product>('insertProduct'))
      );
  }

  editProduct(product: Product): Observable<Product> {
    return this._http.post<Product>(this._baseUrl + this._productEditUrl, product, httpOptions)
      .pipe(
        tap(products => this.log(`fetched products`)),
        catchError(this.handleError<Product>('editProduct'))
      );
  }

  deleteProduct(product: Product): Observable<any> {
    return this._http.post<Product>(this._baseUrl + this._productDeleteUrl + product.id, product, httpOptions)
      .pipe(
        tap(products => {
          this.log(`fetched products`);
        }
      ),
        catchError(this.handleError<Product>('deleteProduct'))
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
    console.log('Product Service' + message);
  }
}
