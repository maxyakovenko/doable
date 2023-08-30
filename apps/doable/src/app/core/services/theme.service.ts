import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum Theme {
    Dark = 'dark',
    Light = 'light'
}

const THEME_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    #themeChanged$: Subject<Theme> = new Subject();
    constructor() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            this.onSystemThemeChanged(e.matches ? Theme.Dark :Theme.Light);
        });
    }

    get storage(): Storage {
        return window.localStorage;
    }

    get themeChanged$(): Observable<Theme> {
        return this.#themeChanged$.asObservable();
    }

    getStoredTheme(): Theme {
        return (this.storage.getItem(THEME_KEY) as Theme);
    }

    setStoredTheme(theme: Theme) {
        this.storage.setItem(THEME_KEY, theme);
    }

    setTheme(theme: Theme = this.getStoredTheme()): void {
        document.documentElement.setAttribute('data-bs-theme', theme);
        this.setStoredTheme(theme);
        this.emitThemeChanged();
    }

    getTheme(): Theme {
        return this.getStoredTheme() || this.getSystemTheme();
    }

    private emitThemeChanged(): void {
        this.#themeChanged$.next(this.getTheme());
    }

    private getSystemTheme(): Theme {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light;
    }

    private onSystemThemeChanged(theme: Theme): void {
        this.setStoredTheme(theme);
        this.setTheme(theme);
    }
}