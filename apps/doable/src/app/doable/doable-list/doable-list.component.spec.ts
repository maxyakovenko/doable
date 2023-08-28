import { Todo, createTodo } from '@doable/api-interfaces';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockComponent, MockPipe } from 'ng-mocks';
import { OrderPipe } from '../../core/pipes/order.pipe';
import { DoableItemComponent } from '../doable-item/doable-item.component';
import { DoableListComponent } from './doable-list.component';

const todos: Todo[] = [
    { id: 'id1', title: 'todo1', completed: false, note: '' },
    { id: 'id2', title: 'todo2', completed: true, note: '' },
    { id: 'id3', title: 'todo3', completed: false, note: '' }
];

describe('DoableListComponent', () => {
    describe('unit tests', () => {
        let spectator: Spectator<DoableListComponent>;
        const createComponent = createComponentFactory({
            component: DoableListComponent,
            shallow: true,
            imports: [],
            declarations: [MockComponent(DoableItemComponent), MockPipe(OrderPipe, (todos) => todos)]
        });
        beforeEach(() => {
            spectator = createComponent({ props: { todos: [...todos] } });
        });

        it('renders todo items', () => {
            const todoItems = spectator.queryAll(DoableItemComponent);
            expect(todoItems.length).toBe(todos.length);
            todoItems.forEach((item, i) => expect(item.todo).toEqual(todos[i]));
        });
    });

    describe('integration tests', () => {
        let spectator: Spectator<DoableListComponent>;
        const createComponent = createComponentFactory({
            component: DoableListComponent
        });

        beforeEach(() => {
            spectator = createComponent({ props: { todos, currentTodo: todos[0] } });
        });

        it('renders todos ordered by completed state', () => {
            const todoItems = spectator.queryAll(DoableItemComponent);
            expect(todoItems.length).toBe(todos.length);
            expect(todoItems[0].todo).toBe(todos[0]);
            expect(todoItems[1].todo).toBe(todos[2]);
            expect(todoItems[2].todo).toBe(todos[1]);
        });

        it('has not selected todos if there is no current todo item', () => {
            spectator = createComponent({ props: { todos, currentTodo: null } });
            const todoItems = spectator.queryAll(DoableItemComponent);
            expect(todoItems.some((item) => item.selected)).toBeFalse();
        });

        it('selects first todo in the list', () => {
            const todo = spectator.query(DoableItemComponent);
            expect(todo.selected).toBeTrue();
        });

        it('selects the last uncompleted todo in the list', () => {
            spectator = createComponent({ props: { todos, currentTodo: todos[2] } });
            const todoItems = spectator.queryAll(DoableItemComponent);
            expect(todoItems[1].selected).toBeTrue();
        });

        it('others todos should be unselected', () => {
            const [todo, ...others] = spectator.queryAll(DoableItemComponent);
            expect(others.every((item) => !item.selected)).toBeTrue();
        });

        describe('@outputs', () => {
            let todo: DoableItemComponent;
            beforeEach(() => {
                todo = spectator.query(DoableItemComponent);
            });
            it('emits todoCancelled event', () => {
                spyOn(spectator.component.todoCancelled, 'emit');
                const expectedOutput = { title: 'Todo title', id: null, completed: false, note: '' } as Todo;
                todo.cancelled.emit(createTodo({ title: 'Todo title' }));
                expect(spectator.component.todoCancelled.emit).toHaveBeenCalledWith(expectedOutput);
            });
    
            it('emits todoChecked event', () => {
                spyOn(spectator.component.todoChecked, 'emit');
                todo.checked.emit();
                expect(spectator.component.todoChecked.emit).toHaveBeenCalledWith(todos[0]);
            });
    
            it('emits todoUnchecked event', () => {
                spyOn(spectator.component.todoUnchecked, 'emit');
                todo.unchecked.emit();
                expect(spectator.component.todoUnchecked.emit).toHaveBeenCalledWith(todos[0]);
            });
    
            it('emits todoDeleted event', () => {
                spyOn(spectator.component.todoDeleted, 'emit');
                todo.deleteClicked.emit();
                expect(spectator.component.todoDeleted.emit).toHaveBeenCalledWith(todos[0]);
            });
    
            it('emits todoSelected event', () => {
                spyOn(spectator.component.todoSelected, 'emit');
                todo.doubleClicked.emit();
                expect(spectator.component.todoSelected.emit).toHaveBeenCalledWith(todos[0]);
            });
    
            it('emits todoUpdated event', () => {
                spyOn(spectator.component.todoUpdated, 'emit');
                const expectedOutput = { title: 'Todo title updated', id: null, completed: false, note: '' } as Todo;
                todo.saved.emit(createTodo({ title: 'Todo title updated' }));
                expect(spectator.component.todoUpdated.emit).toHaveBeenCalledWith(expectedOutput);
            });
        });
    });
});