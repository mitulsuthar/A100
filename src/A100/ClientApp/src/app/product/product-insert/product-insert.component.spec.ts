import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInsertComponent } from './product-insert.component';

describe('ProductInsertComponent', () => {
  let component: ProductInsertComponent;
  let fixture: ComponentFixture<ProductInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
