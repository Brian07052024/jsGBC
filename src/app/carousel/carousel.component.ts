import { Component, computed, effect, HostListener, input, output, signal } from '@angular/core';
import { CartridgeComponent } from '../cartridge/cartridge.component';
import { Juego } from '../juegos';

const SEPARACION = 215;
const PROFUNDIDAD = 240;
const GIRO = 34;
const VISIBLES = 2.6;
const MS_INSERCION = 820;

interface Tarjeta {
  juego: Juego;
  indice: number;
  activa: boolean;
  transform: string;
  filtro: string;
  opacidad: number;
  z: number;
  visible: boolean;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CartridgeComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  juegos = input.required<Juego[]>();
  activo = input(true);

  seleccionar = output<Juego>();

  indice = signal(0);
  insertando = signal(false);

  private arrastre = signal(0);
  arrastrando = signal(false);
  private origenX = 0;
  private huboArrastre = false;

  juego = computed(() => this.juegos()[this.indice()]);

  tarjetas = computed<Tarjeta[]>(() => {
    const juegos = this.juegos();
    const total = juegos.length;
    const centro = this.indice();
    const desvio = this.arrastre() / SEPARACION;

    return juegos.map((juego, i) => {
      let paso = (((i - centro) % total) + total) % total;
      if (paso > total / 2) paso -= total;
      const offset = paso + desvio;
      const dist = Math.abs(offset);

      return {
        juego,
        indice: i,
        activa: i === centro,
        transform: `translate(-50%, -50%)
          translateX(${offset * SEPARACION}px)
          translateZ(${-dist * PROFUNDIDAD}px)
          rotateY(${-offset * GIRO}deg)
          scale(${Math.max(0.55, 1 - dist * 0.07)})`,
        filtro: `brightness(${Math.max(0.35, 1 - dist * 0.26)}) blur(${Math.min(dist * 1.8, 5)}px)`,
        opacidad: dist > VISIBLES ? 0 : Math.max(0, 1 - dist * 0.26),
        z: Math.round(100 - dist * 10),
        visible: dist <= VISIBLES
      };
    });
  });

  constructor() {
    effect(() => {
      if (this.activo()) {
        this.insertando.set(false);
      }
    });
  }

  mover(direccion: number) {
    if (!this.activo() || this.insertando()) return;
    const total = this.juegos().length;
    this.indice.update(i => (i + direccion + total) % total);
  }

  irA(indice: number) {
    if (!this.activo() || this.insertando()) return;
    this.indice.set(indice);
  }

  insertar() {
    if (!this.activo() || this.insertando()) return;
    this.insertando.set(true);
    setTimeout(() => this.seleccionar.emit(this.juego()), MS_INSERCION);
  }

  @HostListener('window:keydown', ['$event'])
  tecla(e: KeyboardEvent) {
    if (!this.activo() || this.insertando()) return;
    if (e.key === 'ArrowLeft') { this.mover(-1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { this.mover(1); e.preventDefault(); }
    if (e.key === 'Enter' || e.key === ' ') { this.insertar(); e.preventDefault(); }
  }

  private ultimaRueda = 0;

  rueda(e: WheelEvent) {
    if (!this.activo() || this.insertando()) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const ahora = Date.now();
    if (Math.abs(delta) < 8 || ahora - this.ultimaRueda < 260) return;
    this.ultimaRueda = ahora;
    this.mover(delta > 0 ? 1 : -1);
  }

  inicioArrastre(e: PointerEvent) {
    if (!this.activo() || this.insertando()) return;
    this.origenX = e.clientX;
    this.huboArrastre = false;
    this.arrastrando.set(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }

  moviendo(e: PointerEvent) {
    if (!this.arrastrando()) return;
    const dx = e.clientX - this.origenX;
    if (Math.abs(dx) > 6) this.huboArrastre = true;
    this.arrastre.set(Math.max(-SEPARACION, Math.min(SEPARACION, dx)));
  }

  finArrastre() {
    if (!this.arrastrando()) return;
    const dx = this.arrastre();
    this.arrastrando.set(false);
    this.arrastre.set(0);
    if (Math.abs(dx) > SEPARACION / 3) {
      this.mover(dx > 0 ? -1 : 1);
    }
  }

  clicTarjeta(t: Tarjeta) {
    if (this.huboArrastre) {
      this.huboArrastre = false;
      return;
    }
    if (t.activa) {
      this.insertar();
    } else {
      this.irA(t.indice);
    }
  }
}
