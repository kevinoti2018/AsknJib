import { Pipe, PipeTransform } from '@angular/core';
import { Questions } from 'src/app/interface/questions';

@Pipe({
  name: 'searchByTitle'
})
export class SearchByTitlePipe implements PipeTransform {
  transform(questions: Questions[], searchTerm: string): Questions[] {
    if (!searchTerm) {
      return questions; // Return all questions if the search term is empty
    }

    searchTerm = searchTerm.toLowerCase();

    return questions.filter((question) =>
      question.Title.toLowerCase().includes(searchTerm) ||
      question.Details.toLowerCase().includes(searchTerm)
    );
  }
}
