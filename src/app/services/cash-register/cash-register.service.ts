import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CashRegisterModel } from '../models/cash-register.model';
import { UrlsApisEnum } from '../enum/urls-apis.enum';


@Injectable({
  providedIn: 'root',
})
export class CashRegisterService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<CashRegisterModel[]> {
    return this.http.get<CashRegisterModel[]>(UrlsApisEnum.API_LOCAL);
  }

  get(id: any): Observable<CashRegisterModel> {
    return this.http.get<CashRegisterModel>(`${UrlsApisEnum.API_LOCAL}/${id}`);
  }

  create(body: CashRegisterModel): Observable<any> {
    return this.http.post(UrlsApisEnum.API_LOCAL, body);
  }

  update(id: number | undefined, body: CashRegisterModel): Observable<any> {
    return this.http.put(`${UrlsApisEnum.API_LOCAL}/${id}`, body);
  }

  delete(id: number | undefined): Observable<any> {
    return this.http.delete(`${UrlsApisEnum.API_LOCAL}/${id}`);
  }

}
