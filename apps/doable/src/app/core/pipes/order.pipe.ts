import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '@doable/api-interfaces';

@Pipe({
  name: 'order',
  standalone: true
})
export class OrderPipe implements PipeTransform {
  transform(todos: Todo[]): Todo[] {
    return [...todos].sort((a, b) => b.completed ? -1: a.completed ? 1 : 0);
  }
}
