import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product, IProduct } from '../product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.sass']
})
export class ProductDeleteComponent implements OnInit {

  public product: Product;
  constructor(private productService: ProductService, private _activeRoute: ActivatedRoute) {
  }
  onDelete(product: Product) {
    this.productService.deleteProduct(product).subscribe(result => {
      console.log(result);
    }, error => console.log(error));
  }
  ngOnInit() {
    this._activeRoute.data.subscribe(data => {
      this.product = data['product'];
    }, error => console.log(error));
  }

}
