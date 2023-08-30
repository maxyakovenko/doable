import { Spectator, SpyObject, byTestId, createComponentFactory, mockProvider } from '@ngneat/spectator';
import { DoableThemeSwitcherComponent } from './doable-theme-switcher.component';
import { Theme, ThemeService } from '../../core/services/theme.service';
import { of } from 'rxjs';

describe('DoableThemeSwitcherComponent', () => {
  let spectator: Spectator<DoableThemeSwitcherComponent>;
  let themeService: SpyObject<ThemeService>;
  const createComponent = createComponentFactory({
    component: DoableThemeSwitcherComponent,
    providers: [mockProvider(ThemeService)],
    detectChanges: false
  });
  beforeEach(() => {
    spectator = createComponent();
    themeService = spectator.inject(ThemeService);
  });

  it('sets dark theme', () => {
    spyOnProperty(themeService, 'themeChanged$').and.returnValue(of(Theme.Dark));
    spectator.detectChanges();
    expect(spectator.component.theme).toBe(Theme.Dark);
  });

  it('sets light theme', () => {
    spyOnProperty(themeService, 'themeChanged$').and.returnValue(of(Theme.Light));
    spectator.detectChanges();
    expect(spectator.component.theme).toBe(Theme.Light);
  });

  it('switches switcher to dark mode if the theme is Dark', () => {
    spyOnProperty(themeService, 'themeChanged$').and.returnValue(of(Theme.Dark));
    spectator.detectChanges();
    const switcher: HTMLInputElement = spectator.query(byTestId('theme-switcher-switch'));
    expect(switcher).toBeChecked();
  });

  it('does not switch switcher to dark mode if the theme is Light', () => {
    spyOnProperty(themeService, 'themeChanged$').and.returnValue(of(Theme.Light));
    spectator.detectChanges();
    const switcher: HTMLInputElement = spectator.query(byTestId('theme-switcher-switch'));
    expect(switcher).not.toBeChecked();
  });

  it('sets light theme when the checkbox is changed', () => {
    spyOnProperty(themeService, 'themeChanged$').and.returnValue(of(Theme.Light));
    spectator.detectChanges();
    spectator.dispatchFakeEvent(byTestId('theme-switcher-switch'), 'change');
    expect(themeService.setTheme).toHaveBeenCalledWith(Theme.Light);
  });

  it('sets dark theme when the checkbox is changed', () => {
    spyOnProperty(themeService, 'themeChanged$').and.returnValue(of(Theme.Dark));
    spectator.detectChanges();
    spectator.dispatchFakeEvent(byTestId('theme-switcher-switch'), 'change');
    expect(themeService.setTheme).toHaveBeenCalledWith(Theme.Dark);
  });
});