import { LoginSuccess } from './../interface/user';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role!:string|null
  token!:string|null
  constructor(){

   }
    login(res:LoginSuccess){
      localStorage.setItem('token',res.token)
      localStorage.setItem('role', res.role)
      localStorage.setItem('username', res.username)
    }

   logout(){
    localStorage.clear()
   }

   isLoggedIn(){
    let role=localStorage.getItem('role')
    this.role= role? role:null
    let token=localStorage.getItem('token')
    this.token= token? token:null
    return  this.token? true :false
   }


   isAdmin(){
    let role=localStorage.getItem('role')
    console.log(role);
    return  role==='1' ?true :false
   
    
   }

   isUser(){
    let role=localStorage.getItem('role')
    return  role==='0' ?true :false
   }
   
   getUsername(){
    let username=localStorage.getItem('username')
    return username
   }
}