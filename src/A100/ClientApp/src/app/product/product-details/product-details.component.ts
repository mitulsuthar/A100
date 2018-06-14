import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product, IProduct } from '../product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product: Product;
  id: number;
  constructor(private productService: ProductService, private _activeRoute: ActivatedRoute) {
    this.id = this._activeRoute.snapshot.params['id'];  

  }

  ngOnInit() {
    this.productService.getProduct(this.id).subscribe(result => {
      this.product = result;
    }, error => console.log(error));
  }

}
