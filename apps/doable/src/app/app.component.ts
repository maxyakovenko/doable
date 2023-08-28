import { Component } from '@angular/core';
import { DoableComponent } from './doable/doable.component';

@Component({
  standalone: true,
  imports: [DoableComponent],
  selector: 'doable-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
