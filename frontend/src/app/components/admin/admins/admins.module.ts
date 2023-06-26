import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forChild([
      {path:'admin/users',loadComponent:()=>import('../users/users.component').then(c=>c.UsersComponent)},
      {path:'admin/question',loadComponent:()=>import('../allquiz/allquiz.component').then(c=>c.AllquizComponent)}
    ])
  ]
})
export class AdminsModule { }
