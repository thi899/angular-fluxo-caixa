import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { TutorialsListComponent } from './components/cash-register/cash-register.component';
//import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { CashRegisterComponent } from './components/cash-register/cash-register.component';
//import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';

const routes: Routes = [
  { path: '', redirectTo: 'fluxo-caixa', pathMatch: 'full' },
  { path: 'fluxo-caixa', component: CashRegisterComponent },
  //{ path: 'tutorials/:id', component: TutorialDetailsComponent },
  // { path: 'add', component: AddTutorialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
