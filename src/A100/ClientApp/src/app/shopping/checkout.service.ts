import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ShippingInfo } from './models/ShippingInfo';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { PaymentInfo } from './models/PaymentInfo';
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
  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
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
  private log(message: string) {
    console.log('Checkout Service ' + message);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return Observable.throw(error || 'Server error');
    };
  }
}
