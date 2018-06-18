import { Component, OnInit, Inject } from '@angular/core';
import { Product, IProduct } from '../product';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.sass']
})

export class ProductInsertComponent implements OnInit {

  public errors: string[];
  public product: IProduct;
  private _baseUrl: string;

  constructor(private productService: ProductService) {
    console.log(productService);
    this.product = new Product("", 0);
  }

  onProductSave(productForm: any) {
    console.log((productForm));
    productForm.controls;
    let product = productForm.value;

    this.productService.insertProduct(product)
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
