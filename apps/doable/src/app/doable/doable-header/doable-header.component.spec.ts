import { DoableHeaderComponent } from './doable-header.component';
import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';

describe('DoableHeaderComponent', () => {
  let spectator: Spectator<DoableHeaderComponent>;
  const createComponent = createComponentFactory(DoableHeaderComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('renders header', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('renders the logo', () => {
    const img: HTMLImageElement = spectator.query(byTestId('todo-header-logo'));
    expect(img.src).toContain('/assets/logo.png');
  });
});
