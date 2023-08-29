import { Spectator, byTestId, createComponentFactory } from '@ngneat/spectator';
import { DoableActionsComponent } from './doable-actions.component';
import { Todo, createTodo } from '@doable/api-interfaces';

const todo: Todo = createTodo({ title: 'Todo 1' });

describe('DoableActionsComponent', () => {
  let spectator: Spectator<DoableActionsComponent>;
  const createComponent = createComponentFactory(DoableActionsComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('emits clear event', () => {
    spyOn(spectator.component.clear, 'emit');
    spectator.click(byTestId('doable-actions-clear'));
    expect(spectator.component.clear.emit).toHaveBeenCalled();
  });

  it('emits markAsCompleted event', () => {
    spyOn(spectator.component.markAsCompleted, 'emit');
    spectator.click(byTestId('doable-actions-mark-all-completed'))
    expect(spectator.component.markAsCompleted.emit).toHaveBeenCalled();
  });

  it('emits markAsNotCompleted event', () => {
    spyOn(spectator.component.markAsNotCompleted, 'emit');
    spectator.click(byTestId('doable-actions-mark-all-not-completed'))
    expect(spectator.component.markAsNotCompleted.emit).toHaveBeenCalled();
  });

  describe('formSubmit', () => {
    it('emits create event', () => {
      spyOn(spectator.component.create, 'emit');
      spectator.typeInElement('Updated title 1', byTestId('doable-actions-input'));
      spectator.dispatchFakeEvent(byTestId('doable-actions-form'), 'submit');
      const expectedOutput = { ...todo, title: 'Updated title 1'};
      expect(spectator.component.create.emit).toHaveBeenCalledWith(expectedOutput);
    });

    it('does not emit create event if the form in invalid', () => {
      spyOn(spectator.component.create, 'emit');
      spectator.dispatchFakeEvent(byTestId('doable-actions-form'), 'submit');
      expect(spectator.component.create.emit).not.toHaveBeenCalled();
    });

    it('resets the form after submit', () => {
      spectator.typeInElement('Updated title 1', byTestId('doable-actions-input'));
      spectator.dispatchFakeEvent(byTestId('doable-actions-form'), 'submit');
      expect(spectator.component.form.getRawValue()).toEqual({ title: null });
    });
  });
});