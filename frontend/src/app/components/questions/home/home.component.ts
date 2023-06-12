import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,MaterialModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isSidenavOpen = true;

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
