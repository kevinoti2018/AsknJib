import { ForgotComponent } from './components/forgot/forgot.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LandingComponent } from './components/homepage/landing/landing.component';

const routes: Routes = [
  {path:'', component:LandingComponent},
  {path:'login',loadComponent:()=>import('./components/login/login.component').then(c=>c.LoginComponent)},
  {path:'signup',loadComponent:()=>import('./components/register/register.component').then(c=>c.RegisterComponent)},
  {path:'reset',loadComponent:()=>import('./components/reset/reset.component').then(c=>c.ResetComponent)},
  {path:'forgot',loadComponent:()=>import('./components/forgot/forgot.component').then(c=>c.ForgotComponent)},
  {path:'**', component:NotfoundComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
