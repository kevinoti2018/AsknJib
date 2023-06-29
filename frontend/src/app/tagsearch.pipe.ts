import { Pipe, PipeTransform } from '@angular/core';
import { Question } from './interface/questions';

@Pipe({
  name: 'tagsearch',
  standalone:true
})
export class TagsearchPipe implements PipeTransform {
  transform(questions: any[], searchText: string): Question[] {
    if (!searchText) {
      return questions;
    }

    searchText = searchText.toLowerCase();

    return questions.filter(question => {
     
    });
  }
}
