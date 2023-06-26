import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterModule } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { AllquizComponent } from '../allquiz/allquiz.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forChild([
      {path:'admin/users',component:UsersComponent},
      {path:'admin/question',component:AllquizComponent}
    ])
  ]
})
export class AdminsModule { }
