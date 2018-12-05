import { Injectable } from '@angular/core';
import { Product } from './product';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductService } from './product.service';
import { of } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable()
export class ProductResolverService implements Resolve<Product> {

    constructor(private productService: ProductService, private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'];
        console.log(id);
        if (isNaN(+id)) {
            console.log('Product id was not a number: ${id}');
            this.router.navigate(['/products']);
            return of(null);
        }
        return this.productService.getProduct(+id)
        .pipe(map(product => {
            if (product) {
                return product;
            }
            console.log('Product was not found: $(id)');
            this.router.navigate(['/products']);
            return null;
        }), catchError(error => {
            console.log(`Retrieval error: ${error}`);
            this.router.navigate(['/products']);
            return of(null);
        }));
    }
}
