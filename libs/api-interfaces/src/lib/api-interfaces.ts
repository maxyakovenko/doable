export interface Todo {
  id: string | null;
  title: string;
  note?: string;
  completed: boolean;
}

export function createTodo(todo?: Partial<Todo>): Todo {
  return {
      id: todo?.id || null,
      title: todo?.title || '',
      note: todo?.note || '',
      completed: todo?.completed || false
  };
}