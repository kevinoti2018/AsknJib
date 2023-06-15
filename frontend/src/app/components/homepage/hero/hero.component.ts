import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material/material.module';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  imports:[CommonModule,MaterialModule],
  styleUrls: ['./hero.component.css'],
  standalone:true
})
export class HeroComponent {

}
