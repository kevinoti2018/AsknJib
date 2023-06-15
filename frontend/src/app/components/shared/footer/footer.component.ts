import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material/material.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports:[CommonModule,MaterialModule,RouterModule],
  styleUrls: ['./footer.component.css'],
  standalone:true
})
export class FooterComponent {

}
