import { Spectator, byTestId, createComponentFactory } from "@ngneat/spectator";
import { Todo } from '@doable/api-interfaces';
import { DoableItemComponent } from './doable-item.component';
import { fakeAsync } from '@angular/core/testing';

const todo = {
    id: 'todo1',
    title: 'Test',
    completed: false,
    note: 'Test note'
} as Todo;

describe('TodoComponent', () => {
    let spectator: Spectator<DoableItemComponent>;
    const createComponent = createComponentFactory({
        component: DoableItemComponent,
        shallow: true
    });
    beforeEach(() => {
        spectator = createComponent({ props: { todo, selected: false } });
    });

    it('renders todo title', () => {
        expect(spectator.query(byTestId('todo-title'))).toHaveExactText(todo.title);
    });

    it('renders unchecked todo checkbox', () => {
        expect(spectator.query(byTestId('todo-checkbox'))).not.toBeChecked();
    });

    it('renders checked todo checkbox if todo is completed', () => {
        spectator.setInput('todo', { ...todo, completed: true });
        expect(spectator.query(byTestId('todo-checkbox'))).toBeChecked();
    });

    it('does not have todo--completed class if todo is not completed', () => {
        spectator.setInput('todo', { ...todo, completed: false });
        expect(spectator.element).not.toHaveClass('todo--completed');
    });

    it('has todo--completed class if todo is completed', () => {
        spectator.setInput('todo', { ...todo, completed: true });
        expect(spectator.element).toHaveClass('todo--completed');
    });

    it('changes title when todo has changed', () => {
        spectator.setInput('todo', { ...todo, title: 'todo2' });
        expect(spectator.query(byTestId('todo-title'))).toHaveExactText('todo2');
    });

    it('checks checkbox on click', () => {
        spyOn(spectator.component.checked, 'emit');
        spectator.click(byTestId('todo-checkbox'));
        expect(spectator.component.checked.emit).toHaveBeenCalled();
    });

    it('unchecks checkbox on click', () => {
        spectator.setInput('todo', {...todo, completed: true});
        spyOn(spectator.component.unchecked, 'emit');
        spectator.click(byTestId('todo-checkbox'));
        expect(spectator.component.unchecked.emit).toHaveBeenCalled();
    });

    it('does not show todo title input', () => {
        expect(spectator.query(byTestId('todo-title-input'))).not.toBeVisible();
    });

    it('does not render action if item is not selected', () => {
        expect(spectator.query(byTestId('todo-actions'))).not.toExist();
    });

    it('does not show todo note', () => {
        expect(spectator.query(byTestId('todo-note'))).not.toExist();
    });

    it('focuses title input on selection', fakeAsync(() => {
        expect(spectator.query(byTestId('todo-title-input'))).not.toBeFocused();
        spectator.setInput('selected', true);
        spectator.tick(0);
        expect(spectator.query(byTestId('todo-title-input'))).toBeFocused();
    }));

    it('triggers doubleClicked event on title doubleclick', () => {
        let doubleClicked = false;
        spectator.component.doubleClicked.subscribe(() => {
            doubleClicked = true;
        });
        spectator.mouse.dblclick(byTestId('todo-title'));
        expect(doubleClicked).toBeTrue();
    });

    it('does not have todo--selected class if todo is not selected', () => {
        expect(spectator.element).not.toHaveClass('todo--selected');
    });

    it('has todo--selected class if todo is selected', () => {
        spectator.setInput('selected', true);
        expect(spectator.element).toHaveClass('todo--selected');
    });

    describe('in selected state', () => {
        beforeEach(() => {
            spectator.setInput('selected', true);
        });

        it('shows todo title input', () => {
            expect(spectator.query(byTestId('todo-title-input'))).toBeVisible();
        });

        it('renders todo actions', () => {
            expect(spectator.query(byTestId('todo-actions'))).toExist();
        });

        it('displays todo note', () => {
            expect(spectator.query(byTestId('todo-note'))).toExist();
        });

        it('triggers deleteClicked event', () => {
            spyOn(spectator.component.deleteClicked, 'emit');
            spectator.click(byTestId('todo-delete-button'));
            expect(spectator.component.deleteClicked.emit).toHaveBeenCalled();
        });
    });

    describe('form submit', () => {
        beforeEach(() => {
            spectator.setInput('selected', true);
        });

        it('calls handleFormSubmit on form submit', () => {
            spyOn(spectator.component, 'handleFormSubmit');
            spectator.dispatchFakeEvent(byTestId('todo-form'), 'submit');
            expect(spectator.component.handleFormSubmit).toHaveBeenCalled();
        })

        it('emits cancelled event on form submit if form is untouched', () => {
            spyOn(spectator.component.cancelled, 'emit');
            spectator.dispatchFakeEvent(byTestId('todo-form'), 'submit');
            expect(spectator.component.cancelled.emit).toHaveBeenCalled();
        });

        it('emits saved event on form submit if form is touched', () => {
            spyOn(spectator.component.saved, 'emit');
            spectator.component.form.markAsDirty();
            spectator.dispatchFakeEvent(byTestId('todo-form'), 'submit');
            expect(spectator.component.saved.emit).toHaveBeenCalledWith(todo);
        });

        it('does not save and does not cancel from selected mode if the form is invalid', () => {
            spyOn(spectator.component.cancelled, 'emit');
            spyOn(spectator.component.saved, 'emit');
            spectator.typeInElement('', spectator.query(byTestId('todo-title-input')));
            spectator.dispatchFakeEvent(byTestId('todo-form'), 'submit');
            expect(spectator.component.cancelled.emit).not.toHaveBeenCalled();
            expect(spectator.component.saved.emit).not.toHaveBeenCalled();
        });

        it('emits saved event with updated title', () => {
            spyOn(spectator.component.saved, 'emit');
            spectator.typeInElement('updated title', spectator.query(byTestId('todo-title-input')));
            spectator.dispatchFakeEvent(byTestId('todo-form'), 'submit');
            expect(spectator.component.saved.emit).toHaveBeenCalledWith({ ...todo, title: 'updated title' });
        });

        it('emits saved event with updated note', () => {
            spyOn(spectator.component.saved, 'emit');
            spectator.typeInElement('updated note', spectator.query(byTestId('todo-note')));
            spectator.dispatchFakeEvent(byTestId('todo-form'), 'submit');
            expect(spectator.component.saved.emit).toHaveBeenCalledWith({ ...todo, note: 'updated note' });
        });

        it('click outsite does not trigger form submit if todo is not selected', () => {
            spyOn(spectator.component, 'handleFormSubmit');
            spectator.dispatchMouseEvent(document.body, 'click', 0, 0);
            expect(spectator.component.handleFormSubmit).toHaveBeenCalled();
        });

        it('click outside triggers form submit', () => {
            spectator.setInput('selected', true);
            spyOn(spectator.component, 'handleFormSubmit');
            spectator.dispatchMouseEvent(document.body, 'click', 0, 0);
            expect(spectator.component.handleFormSubmit).toHaveBeenCalled();
        });

        it('click inside does not trigger form submit', () => {
            spyOn(spectator.component, 'handleFormSubmit');
            spectator.dispatchMouseEvent(spectator.element, 'click', 0, 0);
            expect(spectator.component.handleFormSubmit).not.toHaveBeenCalled();
        });
    });
});