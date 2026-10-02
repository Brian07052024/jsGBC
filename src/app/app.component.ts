import { CurrencyPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { GameboyComponent } from './gameboy/gameboy.component';
@Component({
  selector: 'app-root',
  imports: [GameboyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}