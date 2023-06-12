import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ask',
  standalone: true,
  imports: [CommonModule,MaterialModule,RouterModule,FormsModule],
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent {
  title!: string;
  tryDetails!:string
  details!:string
  expect!:string
  tags!:string
  isSidenavOpen = false;


  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  
}
