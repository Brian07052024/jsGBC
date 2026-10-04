import { AfterViewInit, Component, ElementRef, effect, input, signal, viewChild } from '@angular/core';
import { WasmBoy } from 'wasmboy';

@Component({
  selector: 'app-gameboy',
  standalone: true,
  templateUrl: './gameboy.component.html',
  styleUrl: './gameboy.component.css'
})
export class GameboyComponent implements AfterViewInit {
  pantalla = viewChild.required<ElementRef<HTMLCanvasElement>>('pantalla');

  rom = input<string | null>(null);
  insertado = input(false);

  encendido = signal(false);
  cargando = signal(false);

  private configurada: Promise<unknown> | null = null;
  private pendiente: string | null = null;

  constructor() {
    effect(() => {
      const rom = this.rom();
      if (rom) {
        this.arrancar(rom);
      } else {
        this.encendido.set(false);
      }
    });
  }

  async ngAfterViewInit() {
    this.configurada = WasmBoy.config(
      {
        headless: false,
        useGbcWhenOptional: true,
        isAudioEnabled: true,
        frameSkip: 1,
        audioBatchProcessing: true,
        audioAccumulateSamples: true,
        tileRendering: true,
        tileCaching: true,
        gameboyFPSCap: 60
      },
      this.pantalla().nativeElement
    );
    await this.configurada;

    if (this.pendiente) {
      const rom = this.pendiente;
      this.pendiente = null;
      this.arrancar(rom);
    }
  }
  
  async arrancar(rom: string) {
    if (!this.configurada) {
      this.pendiente = rom;
      return;
    }
    this.cargando.set(true);
    try {
      await this.configurada;
      await WasmBoy.loadROM(rom);
      WasmBoy.resumeAudioContext();
      await WasmBoy.play();
      this.encendido.set(true);
    } finally {
      this.cargando.set(false);
    }
  }

  async pausar() {
    if (!this.encendido()) return;
    await WasmBoy.pause();
    this.encendido.set(false);
  }
}
