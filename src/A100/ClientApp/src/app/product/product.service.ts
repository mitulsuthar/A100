import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from './product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()

export class ProductService {

  
  private _baseUrl: string;
  private _productListUrl: string = "api/Product/List";
  private _productInsertUrl: string = "api/Product/Insert";
  private _productEditUrl: string = "api/Product/Edit";
  private _productFindUrl: string = "api/Product/Find/";
  private _productDeleteUrl: string = "api/Product/Delete/";
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
        tap(products => this.log(`fetched products`)),
        catchError(this.handleError<Product>('deleteProduct'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); //log to console instead       
      this.log(`${operation} failed: ${error.message}`);      
      return Observable.throw(error || 'Server error');
    };
  }
   
  private log(message: string) {
    console.log("Product Service" + message);
  }
}
