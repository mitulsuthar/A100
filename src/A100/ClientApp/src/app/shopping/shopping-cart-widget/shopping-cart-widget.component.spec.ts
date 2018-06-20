import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartWidgetComponent } from './shopping-cart-widget.component';

describe('ShoppingCartWidgetComponent', () => {
  let component: ShoppingCartWidgetComponent;
  let fixture: ComponentFixture<ShoppingCartWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
