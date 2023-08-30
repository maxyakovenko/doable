import { MockComponent } from 'ng-mocks';
import { DoableThemeSwitcherComponent } from '../doable-theme-switcher/doable-theme-switcher.component';
import { DoableHeaderComponent } from './doable-header.component';
import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';

describe('DoableHeaderComponent', () => {
  let spectator: Spectator<DoableHeaderComponent>;
  const createComponent = createComponentFactory({
    component: DoableHeaderComponent,
    componentMocks: [MockComponent(DoableThemeSwitcherComponent)]
  });

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

  it('renders theme switcher', () => {
    const themeSwitcher = spectator.queryAll(DoableThemeSwitcherComponent);
    expect(themeSwitcher.length).toBe(1);
  });
});
