import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product, IProduct } from '../product';
import { FormControl, AbstractControl } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  public errors: string[];
  public product: Product;
  id: number;
  private _baseUrl: string;
  constructor(private _http: HttpClient, private _activeRoute: ActivatedRoute, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this.id = this._activeRoute.snapshot.params['id'];
    this._http.get<Product>(baseUrl + 'api/Product/Find/' + this.id).subscribe(result => {
      this.product = result;
    }, error => console.log(error));


  }

  onProductSave(productForm: any) {
    console.log((productForm));
    productForm.controls;
    let product = productForm.value;
    
    this._http.post<Product>(this._baseUrl + 'api/Product/Edit', product, httpOptions)
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
