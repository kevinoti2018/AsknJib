import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answering } from '../interface/answers';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  constructor(private httpclient:HttpClient) { }
  private baseUrl ='http://localhost:4000/answers'
  userAnswers(){
    return this.httpclient.get(`${this.baseUrl}/users/:User_Id`)

  }
  answeQuestion(Answer:string, QuestionId:string){
    return this.httpclient.post(`${this.baseUrl}/answer/${QuestionId}`,{Answer})
  }
  
}
