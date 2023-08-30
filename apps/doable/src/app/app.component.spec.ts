import { Spectator, SpyObject, createComponentFactory, mockProvider } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { ThemeService } from './core/services/theme.service';
import { MockComponent } from 'ng-mocks';
import { DoableComponent } from './doable/doable.component';

describe('AppComponent', () => {
    let spectator: Spectator<AppComponent>;
    let themeService: SpyObject<ThemeService>;
    const createComponent = createComponentFactory({
        component: AppComponent,
        providers: [mockProvider(ThemeService)],
        imports: [MockComponent(DoableComponent)],
        shallow: true,
    });
    beforeEach(() => {
        spectator = createComponent();
        themeService = spectator.inject(ThemeService);
    });

    it('does not set active theme on init', () => {
        expect(themeService.setTheme).not.toHaveBeenCalled();
    });

    it('sets active theme on DOMContentLoaded', () => {
        spectator.dispatchFakeEvent(window, 'DOMContentLoaded');
        expect(themeService.setTheme).toHaveBeenCalledTimes(1);
    });
});