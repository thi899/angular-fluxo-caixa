import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CashRegisterComponent } from './cash-register.component';
import { CashRegisterService } from 'src/app/services/cash-register.service';
import { of, throwError } from 'rxjs';
import { CashRegisterModel } from 'src/app/models/cash-register.model';
import { ElementRef } from '@angular/core';

describe('CashRegisterComponent', () => {
  let component: CashRegisterComponent;
  let fixture: ComponentFixture<CashRegisterComponent>;
  let cashRegisterService: jasmine.SpyObj<CashRegisterService>;

  beforeEach(async () => {
    const cashRegisterServiceSpy = jasmine.createSpyObj('CashRegisterService', ['getAll', 'create', 'update', 'delete']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CashRegisterComponent],
      providers: [
        { provide: CashRegisterService, useValue: cashRegisterServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CashRegisterComponent);
    component = fixture.componentInstance;
    cashRegisterService = TestBed.inject(CashRegisterService) as jasmine.SpyObj<CashRegisterService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.initForm();
    expect(component.cashRegisterForm).toBeDefined();
    expect(component.cashRegisterForm.controls['description'].valid).toBeFalse();
  });

  it('should reset the form to default values', () => {
    component.initFormDefaultValues();
    expect(component.cashRegisterForm.value).toEqual({
      description: '',
      value: '',
      entryExit: 'Selecione entrada ou saída'
    });
  });

  it('should save a cash register', () => {
    const mockCashRegister: CashRegisterModel = {
      id: 1,
      description: 'Test',
      value: '100',
      inputOrOutput: 'entrada'
    };
    
    cashRegisterService.create.and.returnValue(of(mockCashRegister));
    component.cashRegisterForm.setValue({
      description: 'Test',
      value: '100',
      entryExit: 'entrada'
    });
    
    component.saveCashRegister();

    expect(cashRegisterService.create).toHaveBeenCalledWith(jasmine.objectContaining({
      description: 'Test',
      value: '100',
      inputOrOutput: 'entrada'
    }));
  });

  it('should handle save error', () => {
    cashRegisterService.create.and.returnValue(throwError('Error'));
    component.cashRegisterForm.setValue({
      description: 'Test',
      value: '100',
      entryExit: 'entrada'
    });

    spyOn(console, 'error');

    component.saveCashRegister();

    expect(console.error).toHaveBeenCalledWith('Error');
  });

  it('should load cash registers', () => {
    const mockCashRegisters: CashRegisterModel[] = [
      { id: 1, description: 'Entry 1', value: '100', inputOrOutput: 'entrada'},
      { id: 2, description: 'Exit 1', value: '50', inputOrOutput: 'saida'}
    ];
    
    cashRegisterService.getAll.and.returnValue(of(mockCashRegisters));
    
    component.getCashRegisters();

    expect(cashRegisterService.getAll).toHaveBeenCalled();
    expect(component.totalIncomes).toEqual(100);
    expect(component.totalExpenses).toEqual(50);
  });

  it('should edit a cash register', () => {
    const mockCashRegister: CashRegisterModel = {
      id: 1,
      description: 'Updated Entry',
      value: '200',
      inputOrOutput: 'entrada'
    };

    component.editingId = 1;
    component.inputDescription = { nativeElement: { value: 'Updated Entry' } } as ElementRef;
    component.inputValue = { nativeElement: { value: '200' } } as ElementRef;
    component.selectValue = { nativeElement: { value: 'entrada' } } as ElementRef;

    cashRegisterService.update.and.returnValue(of(mockCashRegister));

    component.editRegister();

    expect(cashRegisterService.update).toHaveBeenCalledWith(1, jasmine.objectContaining({
      description: 'Updated Entry',
      value: '200',
      inputOrOutput: 'entrada'
    }));
  });

  it('should delete a cash register', () => {
    cashRegisterService.delete.and.returnValue(of({}));

    component.deleteRegister(1);

    expect(cashRegisterService.delete).toHaveBeenCalledWith(1);
  });

  it('should clean non-numeric input', () => {
    const cleaned = component.setJustNumber('abc123def');
    expect(cleaned).toBe('123');
  });

  it('should calculate totals correctly', () => {
    const mockCashRegisters: CashRegisterModel[] = [
      { id: 1, description: 'Entry 1', value: '100', inputOrOutput: 'entrada'},
      { id: 2, description: 'Exit 1', value: '50', inputOrOutput: 'saida'}
    ];

    component.calculateTotals(mockCashRegisters);

    expect(component.totalIncomes).toBe(100);
    expect(component.totalExpenses).toBe(50);
  });
});
