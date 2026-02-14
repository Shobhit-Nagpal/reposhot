import { ColorEngine } from '@/core/color-engine/engine';
import { Hex, HSL, RGB } from '@/types';
import { effect, Injectable, signal } from '@angular/core';

@Injectable()
export class ColorService {
  #state = signal('');
  #engine = new ColorEngine();

  currentColor = this.#state.asReadonly();

  constructor() {
    // Init state
    this.#state.set(this.#engine.hslToHex(this.#engine.state));

    // Keep engine and service state in sync
    effect(() => {
      const state = this.#state();
      const rgb = this.#engine.hexToRgb(state);
      const hsl = this.#engine.rgbToHsl(rgb);

      this.#engine.state = hsl;
    });
  }

  set(hex: string) {
    this.#state.set(hex);
  }

  setHue(h: number) {
    const hsl = this.hsl();
    hsl.h = h;

    const hex = this.#engine.hslToHex(hsl);

    this.#state.set(hex);
  }

  setAlpha(a: number) {
    const hsl = this.hsl();
    hsl.a = a;

    const hex = this.#engine.hslToHex(hsl);

    this.#state.set(hex);
  }

  rgb(): RGB {
    return this.#engine.hexToRgb(this.#state());
  }

  hex(): Hex {
    return this.#state();
  }

  hsl(): HSL {
    return this.#hexToHsl(this.#state());
  }

  alpha(): number {
    return this.#hexToHsl(this.#state()).a ?? 1;
  }

  #hexToHsl(hex: string): HSL {
    return this.#engine.rgbToHsl(this.#engine.hexToRgb(hex));
  }
}
