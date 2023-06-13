import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-allquiz',
  standalone: true,
  imports: [CommonModule,MaterialModule,RouterModule],
  templateUrl: './allquiz.component.html',
  styleUrls: ['./allquiz.component.css']
})
export class AllquizComponent {
 
  isSidenavOpen = false;


  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
