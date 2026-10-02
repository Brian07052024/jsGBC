import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { WasmBoy } from 'wasmboy';

@Component({
  selector: 'app-gameboy',
  standalone: true,
  templateUrl: './gameboy.component.html',
  styleUrl: './gameboy.component.css'
})
export class GameboyComponent implements AfterViewInit {
  @ViewChild('pantalla') pantalla!: ElementRef<HTMLCanvasElement>;

  encendido = false;

  async ngAfterViewInit() {
    await WasmBoy.config(
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
      this.pantalla.nativeElement
    );
    await WasmBoy.loadROM('pokemon.gbc');
  }

  async encenderGbc() {
    WasmBoy.resumeAudioContext();
    await WasmBoy.play();
    this.encendido = true;
  }
}