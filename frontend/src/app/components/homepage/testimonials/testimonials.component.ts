import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material/material.module';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  imports:[CommonModule,MaterialModule],
  styleUrls: ['./testimonials.component.css'],
  standalone:true
})
export class TestimonialsComponent {

}
