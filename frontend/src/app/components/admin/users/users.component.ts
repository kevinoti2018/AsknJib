import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interface/user';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/State/appState';
import { DeleteUser, getUsers } from 'src/app/State/Actions/userActions';

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
  constructor(private userService:UserService, private store:Store<AppState>){}
  ngOnInit(): void {
    this.store.dispatch(getUsers())
    this.store.select('user').subscribe(
      (response)=>{
        this.users=response.users
      }
    )
  }

  deleteUser(User_Id:string){
  this.store.dispatch(DeleteUser({User_Id}))

  }

}

