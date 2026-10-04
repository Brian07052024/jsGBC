import { Component, signal } from '@angular/core';
import { GameboyComponent } from './gameboy/gameboy.component';
import { CarouselComponent } from './carousel/carousel.component';
import { Juego, JUEGOS } from './juegos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameboyComponent, CarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  juegos = JUEGOS;

  escena = signal<'seleccion' | 'jugando'>('seleccion');
  elegido = signal<Juego | null>(null);

  jugando = () => this.escena() === 'jugando';

  insertar(juego: Juego) {
    this.elegido.set(juego);
    this.escena.set('jugando');
  }

  expulsar() {
    this.escena.set('seleccion');
    this.elegido.set(null);
  }
}
