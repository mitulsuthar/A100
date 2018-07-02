import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product, IProduct } from '../product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit {

  public product: Product;
  constructor(private productService: ProductService, private _activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this._activeRoute.data.subscribe(data => {
      this.product = data['product'];
    }, error => console.log(error));
  }

}
