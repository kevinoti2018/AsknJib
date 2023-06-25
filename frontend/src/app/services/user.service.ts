import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, LoginSuccess,ResetEmail,RegisterSuccess,User } from '../interface/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:Login[]=[]
  private baseUrl = 'localhost:4000/usersroutes'
  constructor(private httpClient:HttpClient) { }

  registerUser(userData: User): Observable<RegisterSuccess> {
    return this.httpClient.post<RegisterSuccess>(`${this.baseUrl}/register`, userData);
  }

  loginUser(userData:Login):Observable<LoginSuccess>{
    return this.httpClient.post<LoginSuccess>(`${this.baseUrl}/register`,userData);

  }

  getUsers(){
  return this.httpClient.get<User[]>(`${this.baseUrl}/register`)
  }
  
}
