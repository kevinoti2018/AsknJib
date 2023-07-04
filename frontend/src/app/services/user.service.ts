import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, LoginSuccess,ResetEmail,RegisterSuccess,User } from '../interface/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:Login[]=[]
  private baseUrl = 'http://localhost:4000/usersroutes'
  constructor(private httpClient:HttpClient) { }

  registerUser(userData: User): Observable<RegisterSuccess> {
    return this.httpClient.post<RegisterSuccess>(`${this.baseUrl}/register`, userData);
  }

  loginUser(userData:Login):Observable<LoginSuccess>{
    return this.httpClient.post<LoginSuccess>(`${this.baseUrl}/login`,userData);

  }

  getUsers(){
   
  return this.httpClient.get<User[]>('http://localhost:4000/usersroutes/allusers');
  }
 

  deleteUser(User_Id:string){
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('token', token);
    return this.httpClient.delete(`http://localhost:4000/usersroutes/deleteuser/${User_Id}`,{headers});
  }
 

  forgotUser(Email:string){
    return this.httpClient.post(`${this.baseUrl}/forgot`,Email)
  }
  
  resetPassword(newPassword:string){
    return this.httpClient.post(`${this.baseUrl}/reset/:token`,newPassword)
  }
  getUser(): Observable<User> {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('token', token);
    
    return this.httpClient.get<User>('http://localhost:4000/usersroutes/user', { headers });
  }
  }
