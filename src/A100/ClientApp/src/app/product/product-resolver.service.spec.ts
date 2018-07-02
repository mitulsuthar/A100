/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductResolverService } from './product-resolver.service';

describe('Service: ProductResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductResolverService]
    });
  });

  it('should ...', inject([ProductResolverService], (service: ProductResolverService) => {
    expect(service).toBeTruthy();
  }));
});
