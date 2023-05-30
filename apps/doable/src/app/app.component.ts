import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';

@Component({
  standalone: true,
  imports: [TodoListComponent],
  selector: 'doable-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
