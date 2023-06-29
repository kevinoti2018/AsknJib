import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchByTitlePipe } from 'src/app/search-by-title.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialModule } from 'src/app/shared/material/material.module';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  imports:[CommonModule,FormsModule,MaterialModule,RouterModule],
  styleUrls: ['./nav.component.css'],
  standalone:true,

})
export class NavComponent {
  searchText: string = '';
  searchTerm:string=''
  constructor(public authService:AuthService){}

}
