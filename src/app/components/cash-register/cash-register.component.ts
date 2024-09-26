import { NgIfContext } from '@angular/common';
import { Component, ElementRef, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CashRegisterModel } from 'src/app/models/cash-register.model';
import { CashRegisterService } from 'src/app/services/cash-register.service';

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrls: ['./cash-register.component.css'],
})
export class CashRegisterComponent implements OnInit {

  @ViewChild('viewDescription') viewDescription: TemplateRef<NgIfContext<boolean>>;
  @ViewChild('inputValue') inputValue: ElementRef;
  @ViewChild('inputDescription') inputDescription: ElementRef;

  cashRegisterModel: CashRegisterModel;

  cashRegisterList$: Observable<CashRegisterModel[]>;

  cashRegisterForm: FormGroup;

  idCounter: number = 1;

  editingId: number | undefined = undefined;



  constructor(
    private cashRegisterService: CashRegisterService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.initFormDefaultValues();
    this.getCashRegisters();
  }

  initForm(): void {
    this.cashRegisterForm = this.formBuilder.group({
      description: ['', Validators.required],
      value: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      entryExit: ['', Validators.required]
    });
  }

  initFormDefaultValues(): void {
    this.cashRegisterForm.patchValue({
      description: '',
      value: '',
      entryExit: 'Selecione entrada ou saída'
    });
  }



  saveCashRegister(): void {
    if (this.cashRegisterForm.valid) {
      this.cashRegisterModel = {
        id: this.getCountListScreen() > 0 ? this.getCountListScreen() + 1 : this.idCounter++,
        description: this.cashRegisterForm.controls['description'].value,
        value: this.cashRegisterForm.controls['value'].value,
        inputOrOutput: this.cashRegisterForm.controls['entryExit'].value,
        isEditing: false
      };

      this.cashRegisterService.create(this.cashRegisterModel).subscribe({
        next: (res) => {
          this.getCashRegisters();
          this.initFormDefaultValues();
        },
        error: (e) => console.error(e)
      });
    }
  }

  getCountListScreen(): number {
    return document.querySelectorAll('tbody tr').length;
  }


  getCashRegisters(): void {
    this.cashRegisterList$ = this.cashRegisterService.getAll();
  }



  removeAllTutorials(): void {
    this.cashRegisterService.deleteAll().subscribe({
      next: (res) => {
        // console.log(res);
        // this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  getIdRegisterCash(cashRegister: CashRegisterModel): void {
    this.editingId = cashRegister.id;
  }

  editRegister(): void {
    debugger
    this.setJustNumber(this.inputValue.nativeElement.value).toString();
    if (this.editingId !== undefined) {
    
      this.cashRegisterModel = {
        id: this.editingId,
        description: this.inputDescription.nativeElement.value,
        value: this.setJustNumber(this.inputValue.nativeElement.value),
        inputOrOutput: this.cashRegisterForm.controls['entryExit'].value,
        isEditing: false
      };

      this.cashRegisterService.update(this.editingId, this.cashRegisterModel).subscribe({
        next: () => {
          this.getCashRegisters(); 
          this.editingId = undefined; 
          this.initFormDefaultValues();
        },
        error: (e) => console.error(e)
      });
    }
  }

  deleteRegister(id: number | undefined): void {
    this.cashRegisterService.delete(id).subscribe({
      next: () => {
        this.getCashRegisters();
        console.log(`Registro ${id} deletado com sucesso.`);
      },
      error: (e) => console.error(`Erro ao deletar o registro: ${e}`)
    });
  }

  setJustNumber(input: string): string {
 
    const cleanedString = input.replace(/[^0-9-]+/g, ''); 
  
    return cleanedString; 
  }

  get description() {
    return this.cashRegisterForm.get('description');
  }

  get value() {
    return this.cashRegisterForm.get('value');
  }

  get entryExit() {
    return this.cashRegisterForm.get('entryExit');
  }

}
