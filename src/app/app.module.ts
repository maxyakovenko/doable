import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo.component';
import { TodosComponent } from './todos/todos.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StateModule } from 'src/libs/state/state.module';

@NgModule({
  declarations: [			
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    TodosComponent
   ],
  imports: [
    StateModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
