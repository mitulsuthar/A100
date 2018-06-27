import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutContactComponent } from './checkout-contact.component';

describe('CheckoutContactComponent', () => {
  let component: CheckoutContactComponent;
  let fixture: ComponentFixture<CheckoutContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
