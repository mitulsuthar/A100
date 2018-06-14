import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product, IProduct } from '../product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  public product: Product;
  id: number;
  constructor(private productService: ProductService, private _activeRoute: ActivatedRoute) {

    this.id = this._activeRoute.snapshot.params['id'];   
  }
  onDelete(product: Product) {
    this.productService.deleteProduct(product).subscribe(result => {
      console.log(result);
    }, error => console.log(error));;
  }
  ngOnInit() {
    this.productService.getProduct(this.id).subscribe(result => {
      this.product = result;
    }, error => console.log(error));
  }

}
