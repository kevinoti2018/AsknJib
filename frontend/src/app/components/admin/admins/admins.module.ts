import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterModule } from '@angular/router';
import { UsersComponent } from '../users/users.component';
import { AllquizComponent } from '../allquiz/allquiz.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {path:'admin/users',component:UsersComponent},
      {path:'admin/question',component:AllquizComponent}
    ])
  ]
})
export class AdminsModule { }
