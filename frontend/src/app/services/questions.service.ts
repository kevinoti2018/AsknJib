import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../interface/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private httpClient:HttpClient) { }
  private baseUrl ='localhost:4000/questions'

  getAllQuestions() {
    return this.httpClient.get<Question[]>('http://localhost:4000/questions/allquestions');
  }
}  
