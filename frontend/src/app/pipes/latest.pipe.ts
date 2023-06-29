import { Pipe, PipeTransform } from '@angular/core';
import { Questions } from '../interface/questions';

@Pipe({
  name: 'latest',
  standalone:true
})
export class LatestPipe implements PipeTransform {

  transform(questions:Questions[]):Questions[]  {
    return questions.reverse()
  }

}
