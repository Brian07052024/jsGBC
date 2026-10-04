import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cartridge',
  standalone: true,
  imports: [],
  templateUrl: './cartridge.component.html',
  styleUrl: './cartridge.component.css'
})
export class CartridgeComponent {
  portada = input<string>('/pokemon.jpg');
  titulo = input<string>('');
}
