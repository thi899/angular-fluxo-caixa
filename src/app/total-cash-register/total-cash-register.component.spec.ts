import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCashRegisterComponent } from './total-cash-register.component';

describe('TotalCashRegisterComponent', () => {
  let component: TotalCashRegisterComponent;
  let fixture: ComponentFixture<TotalCashRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalCashRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalCashRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
