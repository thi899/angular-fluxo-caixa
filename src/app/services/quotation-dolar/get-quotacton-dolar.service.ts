import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsApisEnum } from '../enum/urls-apis.enum';
import { Observable } from 'rxjs';
import { QuotationModel } from '../models/quotation-dolar.model';

@Injectable({
  providedIn: 'root'
})
export class GetQuotationDolarService {

  constructor(private http: HttpClient) { }

  getQuotation(param: string): Observable<any> {
    const url = `${UrlsApisEnum.API_DOLAR_QUOTATION}/${param}`

    return this.http.get<QuotationModel>(url);
  }
}
