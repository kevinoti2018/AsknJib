import { HttpClient } from '@angular/common/http';
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
  return this.httpClient.get<User[]>('http://localhost:4000/usersroutes/allusers')
  }
  

  deleteUser(User_Id:string){
    return this.httpClient.delete('localhost:4000/usersroutes/deleteuser')
  }
}
