import { Pipe, PipeTransform } from '@angular/core';
import { Question } from './interface/questions';

@Pipe({
  name: 'questionsearch'
})
export class QuestionsearchPipe implements PipeTransform {
  transform(questions: any[], searchText: string): Question[] {
    if (!searchText) {
      return questions;
    }

    searchText = searchText.toLowerCase();

    return questions.filter(question => {
      return (
        question.title.toLowerCase().includes(searchText) ||
        question.body.toLowerCase().includes(searchText)
      );
    });
  }
}
