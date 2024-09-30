import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { GetQuotationDolarService } from './services/quotation-dolar/get-quotacton-dolar.service';
import { Subject, takeUntil } from 'rxjs';
import { QuotationModel } from './services/models/quotation-dolar.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'Angular 14 caixa';

  quotationDolar: QuotationModel;

  private destroyed$ = new Subject<void>();

  constructor(private getQuotationDolarService: GetQuotationDolarService) { }
  ngAfterViewInit(): void {
    this.getQuotationDolar();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getQuotationDolar() {
    this.getQuotationDolarService
      .getQuotation('USD-BRL')
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (quotationDolar) => {
          this.quotationDolar = quotationDolar;
          console.log(quotationDolar);
        },
        error: (e) => console.error(e)
      })
  }
}
