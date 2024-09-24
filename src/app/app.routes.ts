import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NewLoanComponent } from './components/Islamic-Products/new-loan/new-loan.component';

export const routes: Routes = [
    {path:'', component:LoginComponent},
    {path:'home', component:NewLoanComponent},

  ];
  
