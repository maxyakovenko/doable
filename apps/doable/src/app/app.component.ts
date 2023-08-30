import { Component, OnInit } from '@angular/core';
import { DoableComponent } from './doable/doable.component';
import { ThemeService } from './core/services/theme.service';
import { fromEvent } from 'rxjs';

@Component({
  standalone: true,
  imports: [DoableComponent],
  selector: 'doable-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    fromEvent(window, 'DOMContentLoaded')
      .subscribe(() => this.themeService.setTheme());
  }
}
