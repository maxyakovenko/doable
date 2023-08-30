import { Component, OnInit } from '@angular/core';
import { Theme, ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'doable-theme-switcher',
  templateUrl: './doable-theme-switcher.component.html',
  standalone: true
})
export class DoableThemeSwitcherComponent implements OnInit {
  public theme: Theme;
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService
      .themeChanged$.subscribe((theme) => this.theme = theme);
  }

  get isDarkTheme(): boolean {
    return this.theme === Theme.Dark;
  }

  handleSwitchChanged(e: Event): void {
    const theme = (e.target as HTMLInputElement).checked ? Theme.Dark : Theme.Light;
    this.setTheme(theme);
  }

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }
}
