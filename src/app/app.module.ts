import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StateModule } from 'src/libs/state/state.module';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  declarations: [			
    AppComponent
   ],
  imports: [
    StateModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    TodoListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
