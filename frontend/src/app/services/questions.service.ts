import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question, Questions, Questions1, topQuiz } from '../interface/questions';
import { Asks } from '../interface/ask';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private httpClient:HttpClient) { }
  private baseUrl ='http://localhost:4000/questions'

  getAllQuestions() {
    return this.httpClient.get<Questions[]>('http://localhost:4000/questions/allquestions');
  }
  getTopQuestion():Observable<topQuiz>{
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('token', token);
    return this.httpClient.get<topQuiz>('http://localhost:4000/questions/topquiz',{headers})
  }
  askQuestion(formData:Asks){
    return this.httpClient.post('http://localhost:4000/questions/ask',formData)
  }
  updateQuestion(formData:Asks, QuestionId:string){
    return this.httpClient.put(`http://localhost:4000/questions/update/${QuestionId}`,formData)
  }
  userQuestions(){
    return this.httpClient.get<Questions[]>(`http://localhost:4000/questions/userquestions`)
  }
  deleteQuestion(QuestionId:string){
    return this.httpClient.delete(`http://localhost:4000/questions/deletequestion/${QuestionId}`)
  }

  tagQuestions(){
    return this.httpClient.get<Questions[]>(`${this.baseUrl}/tagquestion`)
  }
  questionDetail(QuestionId:string){
    return this.httpClient.get<Questions1>(`http://localhost:4000/questions/allquestions/${QuestionId}`)
  }
  
  upvoteQuestion(QuestionId:string){
    return this.httpClient.put(`http://localhost:4000/questions/upvote`,{QuestionId})
  }

  downvoteQuestion(QuestionId:string){
    return this.httpClient.put(`http://localhost:4000/questions/downvote`,{QuestionId})
  }
  
}  
