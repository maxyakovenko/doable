import { SpyObject } from '@ngneat/spectator';
import { ThemeService, Theme } from './theme.service';

describe('ThemeService', () => {
    let themeService: ThemeService;
    beforeEach(() => {
        themeService = new ThemeService();
    });

    it('returns local storage as storage by default', () => {
        expect(themeService.storage).toEqual(window.localStorage);
    });

    describe('using storage', () => {
        let localStorageSpy: SpyObject<Storage>;
        beforeEach(() => {
            localStorageSpy = jasmine.createSpyObj(window.localStorage, ['getItem', 'setItem']);
            spyOnProperty(themeService, 'storage').and.returnValue(localStorageSpy);
        });

        it('returns null as stored theme', () => {
            localStorageSpy.getItem.and.returnValue(null);
            expect(themeService.getStoredTheme()).toBeNull();
        });

        it('returns stored theme', () => {
            localStorageSpy.getItem.and.returnValue(Theme.Light);
            const theme = themeService.getStoredTheme();
            expect(theme).toBe(Theme.Light);
        });

        it('sets stored theme', () => {
            themeService.setStoredTheme(Theme.Light);
            expect(localStorageSpy.setItem).toHaveBeenCalledWith('theme', Theme.Light);
        });

        it('sets data-bs-theme attribute', () => {
            themeService.setTheme(Theme.Dark);
            expect(document.documentElement.getAttribute('data-bs-theme')).toBe(Theme.Dark);
            themeService.setTheme(Theme.Light);
            expect(document.documentElement.getAttribute('data-bs-theme')).toBe(Theme.Light);
        });

        it('set stored theme', () => {
            themeService.setTheme(Theme.Dark);
            expect(localStorageSpy.setItem).toHaveBeenCalledWith('theme', Theme.Dark);
            themeService.setTheme(Theme.Light);
            expect(localStorageSpy.setItem).toHaveBeenCalledWith('theme', Theme.Dark);
        });

        it('emits dark theme in themeChanged$ event', () => {
            localStorageSpy.getItem.and.returnValue(Theme.Dark);
            let outputTheme;
            themeService.themeChanged$.subscribe((theme) => {
                outputTheme = theme;
            });
            themeService.setTheme(Theme.Dark);
            expect(outputTheme).toBe(Theme.Dark);
        });

        it('emits light theme in themeChanged$ event', () => {
            localStorageSpy.getItem.and.returnValue(Theme.Light);
            let outputTheme;
            themeService.themeChanged$.subscribe((theme) => {
                outputTheme = theme;
            });
            themeService.setTheme(Theme.Light);
            expect(outputTheme).toBe(Theme.Light);
        });

        it('returns stored theme', () => {
            localStorageSpy.getItem.and.returnValue(Theme.Light);
            const theme = themeService.getTheme();
            expect(theme).toBe(Theme.Light);
        });

        it('returns light theme as the system theme', () => {
            const mediaQueryList = { matches: false } as MediaQueryList;
            spyOn(window, 'matchMedia').and.returnValue(mediaQueryList);
            const theme = themeService.getTheme();
            expect(theme).toBe(Theme.Light);
        });

        it('returns dark theme as the system theme', () => {
            const mediaQueryList = { matches: true } as MediaQueryList;
            spyOn(window, 'matchMedia').and.returnValue(mediaQueryList);
            const theme = themeService.getTheme();
            expect(theme).toBe(Theme.Dark);
        });
    })
});