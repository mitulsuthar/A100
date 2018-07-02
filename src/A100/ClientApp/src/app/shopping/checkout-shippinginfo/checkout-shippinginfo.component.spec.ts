import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutShippinginfoComponent } from './checkout-shippinginfo.component';

describe('CheckoutShippinginfoComponent', () => {
  let component: CheckoutShippinginfoComponent;
  let fixture: ComponentFixture<CheckoutShippinginfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutShippinginfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutShippinginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
