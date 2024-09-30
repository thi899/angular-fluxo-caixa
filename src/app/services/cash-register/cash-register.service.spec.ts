import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CashRegisterService } from './cash-register.service';
import { CashRegisterModel } from '../models/cash-register.model';

describe('CashRegisterService', () => {
  let service: CashRegisterService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:8080/cashRegister';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CashRegisterService],
    });

    service = TestBed.inject(CashRegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all cash registers', () => {
    const dummyCashRegisters: CashRegisterModel[] = [
      {
        "id": 12,
        "description": "asas",
        "value": "11",
        "inputOrOutput": "saida",
      },
      {
        "id": 13,
        "description": "assa",
        "value": "10",
        "inputOrOutput": "entrada"
      },
      {
        "id": 14,
        "description": "11",
        "value": "11",
        "inputOrOutput": "entrada"
      },
      {
        "id": 17,
        "description": "sasas",
        "value": "100",
        "inputOrOutput": "saida"
      },
      {
        "id": 23,
        "description": "aa",
        "value": "11",
        "inputOrOutput": "entrada"
      },
      {
        "id": 12,
        "description": "klsak",
        "value": "10",
        "inputOrOutput": "saida"
      },
      {
        "id": 11,
        "description": "huhu",
        "value": "800",
        "inputOrOutput": "saida"
      },
      {
        "id": 8,
        "description": "jijsai",
        "value": "2000000",
        "inputOrOutput": "entrada"
      }
    ];

    service.getAll().subscribe((cashRegisters) => {
      expect(cashRegisters.length).toBe(8);
      expect(cashRegisters).toEqual(dummyCashRegisters);
    });

    const request = httpMock.expectOne(baseUrl);
    expect(request.request.method).toBe('GET');
    request.flush(dummyCashRegisters);
  });

  it('should retrieve a single cash register by ID', () => {
    const dummyCashRegister: CashRegisterModel =
    {
      "id": 13,
      "description": "assa",
      "value": "10",
      "inputOrOutput": "entrada",
    }

    service.get(1).subscribe((cashRegister) => {
      expect(cashRegister).toEqual(dummyCashRegister);
    });

    const request = httpMock.expectOne(`${baseUrl}/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyCashRegister);
  });

  it('should create a new cash register', () => {
    const newCashRegister: CashRegisterModel = {
      "id": 12,
      "description": "asas",
      "value": "11",
      "inputOrOutput": "saida"
    }

    service.create(newCashRegister).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const request = httpMock.expectOne(baseUrl);
    expect(request.request.method).toBe('POST');

  });

  it('should update an existing cash register', () => {
    const updatedCashRegister: CashRegisterModel =    {
      "id": 1,
      "description": "asas",
      "value": "11",
      "inputOrOutput": "saida"
    }

    service.update(1, updatedCashRegister).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const request = httpMock.expectOne(`${baseUrl}/1`);
    expect(request.request.method).toBe('PUT');
    request.flush(updatedCashRegister);
  });

  it('should delete a cash register', () => {
    service.delete(1).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const request = httpMock.expectOne(`${baseUrl}/1`);
    expect(request.request.method).toBe('DELETE');
    request.flush({});
  });
});
