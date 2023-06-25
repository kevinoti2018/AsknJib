import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,MaterialModule,RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
 
  isSidenavOpen = false;
  users:User[]=[]

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  constructor(private userService:UserService){}

  getUsers(){
    this.userService.getUsers().subscribe(
      (response)=>{
        this.users= response
      },
      (error)=>{
        console.log(error)
      }
    )
  }

}

