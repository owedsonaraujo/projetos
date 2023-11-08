import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LancamentosComponent } from './lancamentos/lancamentos.component';

const recRoutes = [
    { path: '', component: LancamentosComponent }
]

const routes: Routes = [
  { path: '', component: LancamentosComponent },
  {
    path: ':lang',
    children: recRoutes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
