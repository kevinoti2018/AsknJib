import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  constructor(private httpclient:HttpClient) { }
  private baseUrl ='localhost:4000/answers'
  userAnswers(){
    return this.httpclient.get(`${this.baseUrl}/users/:User_Id`)

  }
  
}
