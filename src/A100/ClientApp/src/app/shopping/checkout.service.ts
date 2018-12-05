
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ShippingInfo } from './models/ShippingInfo';
import { catchError, tap } from 'rxjs/operators';

import { PaymentInfo } from './models/PaymentInfo';
import { ReviewOrder } from './models/ReviewOrder';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class CheckoutService {
  private _baseUrl: string;
  private _insertShippingInfo = 'api/Checkout/ShippingInfo/Insert';
  private _insertPaymentInfo = 'api/Checkout/PaymentInfo/Insert';
  private _getOrderInfo = 'api/Checkout/Order/Review';
  private _submitOrder = 'api/Checkout/Order/Submit';
  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }
  submitOrder(): Observable<any> {
    return this._http.post<any>(this._baseUrl + this._submitOrder, httpOptions)
      .pipe(
        tap(() => {
        this.log(`submitted order`);
      }
      ),
        catchError(this.handleError<any>('submitOrder error'))
      );
  }
  insertShippingInfo(shippingInfo: ShippingInfo): Observable<ShippingInfo> {
    return this._http.post<ShippingInfo>(this._baseUrl + this._insertShippingInfo, shippingInfo, httpOptions)
    .pipe(
      tap(() => {
      this.log(`inserted shippingInfo`);
    }
    ),
      catchError(this.handleError<ShippingInfo>('insertShippingInfo'))
    );
  }

  insertPaymentInfo(paymentInfo: PaymentInfo): Observable<PaymentInfo> {
    return this._http.post<PaymentInfo>(this._baseUrl + this._insertPaymentInfo, paymentInfo, httpOptions)
    .pipe(
      tap(() => {
        this.log('inserted paymentInfo');
      }),
      catchError(this.handleError<PaymentInfo>('insertPaymentInfo'))
    );
  }

  getOrderInfo(): Observable<ReviewOrder> {
    return this._http.get<ReviewOrder>(this._baseUrl + this._getOrderInfo)
    .pipe(
      tap(products => this.log(`fetched review order`)),
      catchError(this.handleError<ReviewOrder>('getOrderInfo'))
    );
  }

  private log(message: string) {
    console.log('Checkout Service ' + message);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return observableThrowError(error || 'Server error');
    };
  }
}
