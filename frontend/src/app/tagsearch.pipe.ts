import { Pipe, PipeTransform } from '@angular/core';
import { Question } from './interface/questions';

@Pipe({
  name: 'tagsearch'
})
export class TagsearchPipe implements PipeTransform {
  transform(questions: any[], searchText: string): Question[] {
    if (!searchText) {
      return questions;
    }

    searchText = searchText.toLowerCase();

    return questions.filter(question => {
      return question.tags.some(tag => tag.toLowerCase().includes(searchText));
    });
  }
}
