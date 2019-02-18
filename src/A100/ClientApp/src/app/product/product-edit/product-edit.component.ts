import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, IProduct } from '../product';
import { FormControl, AbstractControl } from '@angular/forms';
import { ProductService } from '../product.service';



@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  public errors: string[];
  public product: Product;
  // id: number;
  private _baseUrl: string;
  constructor(private productService: ProductService, private _activeRoute: ActivatedRoute) {
    // this.id = this._activeRoute.snapshot.params['id'];
  }

  onProductSave(productForm: any) {
    console.log((productForm));
    const product: Product = productForm.value;
    this.productService.insertProduct(product)
      .subscribe(result => {
        console.log(result);
        this.errors = [];
        productForm.reset();
      }, error => {
        console.log(error);
        console.log(error.error);
        if (error.status === 400) {
          const allErrors = error.error;
          for (const fieldName in allErrors) {
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
    this._activeRoute.data.subscribe(data => {
      this.product = data['product'];
    }, error => console.log(error));
    this.errors = [];
  }

}
