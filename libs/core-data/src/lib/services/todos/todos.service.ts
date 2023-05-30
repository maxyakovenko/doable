import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '@doable/api-interfaces';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class TodosService {
    private readonly model = 'todos';
    constructor(private http: HttpClient) {}
    
    get(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.getUrl());
    }

    create(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(this.getUrl(), todo);
    }

    update(todo: Todo): Observable<Todo> {
        return this.http.put<Todo>(this.getUrlWithId(todo.id as string), todo);
    }

    deleteMany(todos: Todo[]): Observable<void> {
        return this.http.post<void>(`${this.getUrl()}/delete`, { ids: todos.map((todo) => todo.id),});
    }

    delete(todo: Todo): Observable<void> {
        return this.http.delete<void>(this.getUrlWithId(todo.id as string));
    }

    complete(todos: Todo[]): Observable<Todo[]> {
        return this.http.post<Todo[]>(`${this.getUrl()}/complete`, { ids: todos.map((todo) => todo.id) })
    }

    uncomplete(todos: Todo[]): Observable<Todo[]> {
        return this.http.post<Todo[]>(`${this.getUrl()}/uncomplete`, { ids: todos.map((todo) => todo.id) })
    }

    getUrl(): string {
        return `${environment.apiEndpoint}/${this.model}`;
    }

    getUrlWithId(id: string): string {
        return `${this.getUrl()}/${id}`
    }
}