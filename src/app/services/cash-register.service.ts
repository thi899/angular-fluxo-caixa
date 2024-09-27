import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CashRegisterModel } from '../models/cash-register.model';

const baseUrl = 'http://localhost:8080/cashRegister';

@Injectable({
  providedIn: 'root',
})
export class CashRegisterService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<CashRegisterModel[]> {
    return this.http.get<CashRegisterModel[]>(baseUrl);
  }

  get(id: any): Observable<CashRegisterModel> {
    return this.http.get<CashRegisterModel>(`${baseUrl}/${id}`);
  }

  create(body: CashRegisterModel): Observable<any> {
    return this.http.post(baseUrl, body);
  }

  update(id: number | undefined, body: CashRegisterModel): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, body);
  }

  delete(id: number | undefined): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findByTitle(title: any): Observable<CashRegisterModel[]> {
    return this.http.get<CashRegisterModel[]>(`${baseUrl}?title=${title}`);
  }
}
