import { Component, OnInit, NgModule } from '@angular/core';
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
export class UsersComponent implements OnInit {
 
  isSidenavOpen = false;
  users:User[]=[]

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  constructor(private userService:UserService){}
  ngOnInit(): void {
    this.getUsers()
  }
  getUsers(){
    this.userService.getUsers().subscribe(
      (response)=>{
        this.users= response
        console.log(response)
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  deleteUser(User_Id:string){
   this.userService.deleteUser(User_Id).subscribe(
    (response)=>{
      console.log("User deleted");
      
    },
    (error)=>{
      console.log(error)
    }
   )
  }

}

