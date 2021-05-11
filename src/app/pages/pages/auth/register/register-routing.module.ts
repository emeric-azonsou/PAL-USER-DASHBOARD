import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { RegisterComponent } from './register.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';


const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  },
  {
    path:'step1',
    component:Step1Component
  },
  {
    path:'step2',
    component:Step2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class RegisterRoutingModule {
}
