import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { HeroComponent } from '../hero/hero.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { ProofnumComponent } from '../proofnum/proofnum.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  imports:[CommonModule,MaterialModule,HeroComponent,TestimonialsComponent,ProofnumComponent],
  styleUrls: ['./landing.component.css'],
  standalone:true
})
export class LandingComponent {

}
