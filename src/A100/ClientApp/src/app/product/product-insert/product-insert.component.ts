import { Component, OnInit, Inject } from '@angular/core';
import { Product, IProduct } from '../product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css']
})

export class ProductInsertComponent implements OnInit {

  public errors: string[];
  public product: IProduct;
  private _baseUrl: string;
  constructor(private _http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private _router: Router) {
    this.product = new Product("", 0);
    this._baseUrl = baseUrl;
  }


  onProductSave(productForm: any) {
    console.log((productForm));
    productForm.controls;
    let product = productForm.value;

    this._http.post<Product>(this._baseUrl + 'api/Product/Insert', product, httpOptions)
      .subscribe(result => {
        console.log(result);
        this.errors = [];
        productForm.reset();
      }, error => {
        console.log(error);
        console.log(error.error);
        if (error.status === 400) {
          let allErrors = error.error;
          for (var fieldName in allErrors) {
            if (allErrors.hasOwnProperty(fieldName)) {
              if (productForm.controls[fieldName]) {
                productForm.controls[fieldName].markAsTouched();
                productForm.controls[fieldName].setErrors({ invalid: true });
                this.errors.push(allErrors[fieldName]);
              }
            }
          }
        }
      });
  }

  ngOnInit() {
    this.errors = [];
  }
}
