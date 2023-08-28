import { Todo, createTodo } from '@doable/api-interfaces';
import { TodoListFacade } from '@doable/core-state';
import { Spectator, SpyObject, createComponentFactory, mockProvider } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { DoableActionsComponent } from './doable-actions/doable-actions.component';
import { DoableHeaderComponent } from './doable-header/doable-header.component';
import { DoableListComponent } from './doable-list/doable-list.component';
import { DoableComponent } from './doable.component';

const todos: Todo[] = [
    createTodo({ title: 'Todo 1' }),
    createTodo({ title: 'Todo 2' }),
    createTodo({ title: 'Todo 3', completed: true }),
];

describe('DoableComponent', () => {
    let spectator: Spectator<DoableComponent>;
    let facade: SpyObject<TodoListFacade>;
    describe('integration tests', () => {
        const currentTodo$: BehaviorSubject<Todo> = new BehaviorSubject(null);
        const createComponent = createComponentFactory({
            component: DoableComponent,
            shallow: true,
            declarations: [MockComponent(DoableListComponent), MockComponent(DoableActionsComponent), MockComponent(DoableHeaderComponent)],
            providers: [mockProvider(TodoListFacade, {
                mutation$: EMPTY,
                todos$: of(todos),
                currentTodo$: currentTodo$.asObservable(),
                hasPast$: of(true),
                hasFuture$: of(true)
            })],
        });

        beforeEach(() => {
            currentTodo$.next(null);
            spectator = createComponent();
            facade = spectator.inject(TodoListFacade);
        });

        it('renders doable header', () => {
            const doableHeader: DoableHeaderComponent = spectator.query(DoableHeaderComponent);
            expect(doableHeader).toBeTruthy();
        });

        it('renders doable actions', () => {
            const doableActions: DoableActionsComponent = spectator.query(DoableActionsComponent);
            expect(doableActions).toBeTruthy();
        });

        it('renders doable list', () => {
            const doableList: DoableListComponent = spectator.query(DoableListComponent);
            expect(doableList.todos).toEqual(todos);
            expect(doableList.currentTodo).toBeNull();
        });

        it('passes current todo', () => {
            currentTodo$.next(todos[1]);
            const doableList: DoableListComponent = spectator.query(DoableListComponent);
            spectator.detectChanges();
            expect(doableList.currentTodo).toEqual(todos[1]);
            currentTodo$.next(todos[2]);
            spectator.detectChanges();
            expect(doableList.currentTodo).toEqual(todos[2]);
        });

        it('creates todo', () => {
            const doableActions = spectator.query(DoableActionsComponent);
            const todo = { ...todos[0], title: 'Updated title 1' };
            doableActions.create.emit(todo);
            expect(facade.create).toHaveBeenCalledOnceWith(todo);
        });

        it('clears todo list', () => {
            const doableActions = spectator.query(DoableActionsComponent);
            doableActions.clear.emit();
            expect(facade.clear).toHaveBeenCalledTimes(1);
        });

        it('marks single todo as completed', () => {
            const doableList = spectator.query(DoableListComponent);
            doableList.todoChecked.emit(todos[2]);
            expect(facade.markAsCompleted).toHaveBeenCalledOnceWith([todos[2]]);
        });

        it('marks single todo as not completed', () => {
            const doableList = spectator.query(DoableListComponent);
            doableList.todoUnchecked.emit(todos[2]);
            expect(facade.markAsNotCompleted).toHaveBeenCalledOnceWith([todos[2]]);
        });

        it('marks all todos as completed', () => {
            const doableActions = spectator.query(DoableActionsComponent);
            doableActions.markAsCompleted.emit();
            expect(facade.markAllAsCompleted).toHaveBeenCalled();
        });

        it('marks all todos as not completed', () => {
            const doableActions = spectator.query(DoableActionsComponent);
            doableActions.markAsNotCompleted.emit();
            expect(facade.markAllAsNotCompleted).toHaveBeenCalled();
        });

        it('deletes todo item', () => {
            const doableList = spectator.query(DoableListComponent);
            doableList.todoDeleted.emit(todos[1]);
            expect(facade.delete).toHaveBeenCalledOnceWith(todos[1]);
        });

        it('selects todo', () => {
            const doableList = spectator.query(DoableListComponent);
            doableList.todoSelected.emit(todos[1]);
            expect(facade.select).toHaveBeenCalledOnceWith(todos[1]);
        });

        it('unselects todo', () => {
            const doableList = spectator.query(DoableListComponent);
            doableList.todoCancelled.emit(todos[1]);
            expect(facade.select).toHaveBeenCalledOnceWith(null);
        });

        it('updates todo', () => {
            const doableList = spectator.query(DoableListComponent);
            const expectedOutput = { ...todos[1], title: 'Updated todo title' };
            doableList.todoUpdated.emit(expectedOutput);
            expect(facade.update).toHaveBeenCalledOnceWith(expectedOutput);
        });

        it('prevents default on undo', () => {
            const event = new KeyboardEvent('keydown', { key: 'z', metaKey: true, shiftKey: false });
            spyOn(event, 'preventDefault');
            document.dispatchEvent(event);
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('prevents default on redo', () => {
            const event = new KeyboardEvent('keydown', { key: 'z', metaKey: true, shiftKey: true });
            spyOn(event, 'preventDefault');
            document.dispatchEvent(event);
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('performs undo', () => {
            spectator.dispatchKeyboardEvent(document, 'keydown', 'meta.z');
            expect(facade.undo).toHaveBeenCalledTimes(1);
            expect(facade.redo).not.toHaveBeenCalled();
        });

        it('performs redo', () => {
            spectator.dispatchKeyboardEvent(document, 'keydown', 'meta.shift.z');
            expect(facade.redo).toHaveBeenCalledTimes(1);
            expect(facade.undo).not.toHaveBeenCalled();
        });
    });
});