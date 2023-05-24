export interface Todo {
    id: string | null;
    title: string;
    completed: boolean;
}

export function createTodo(todo?: Partial<Todo>): Todo {
    return {
        id: todo?.id || null,
        title: todo?.title || '',
        completed: todo?.completed || false
    };
}