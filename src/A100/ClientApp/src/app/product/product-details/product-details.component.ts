import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product, IProduct } from '../product';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product: Product;
  id: number;
  constructor(http: HttpClient, private _activeRoute: ActivatedRoute, @Inject('BASE_URL') baseUrl: string) {

    this.id = this._activeRoute.snapshot.params['id'];
    http.get<Product>(baseUrl + 'api/Product/Find/' + this.id).subscribe(result => {
      this.product = result;
    }, error => console.log(error));


  }

  ngOnInit() {
  }

}
