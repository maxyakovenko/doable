import { Component } from '@angular/core';
import { DoableThemeSwitcherComponent } from '../doable-theme-switcher/doable-theme-switcher.component';

@Component({
  selector: 'doable-header',
  imports: [DoableThemeSwitcherComponent],
  templateUrl: './doable-header.component.html',
  styleUrls: ['./doable-header.component.scss'],
  standalone: true
})
export class DoableHeaderComponent {}
