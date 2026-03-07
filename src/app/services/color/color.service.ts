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
    const hex = this.#engine.hslToHex({
      ...this.hsl(),
      h
    });

    this.#state.set(hex);
  }

  setSaturation(s: number) {
    const hex = this.#engine.hslToHex({
      ...this.hsl(),
      s
    });

    this.#state.set(hex);
  }

  setLightness(l: number) {
    const hex = this.#engine.hslToHex({
      ...this.hsl(),
      l
    });

    this.#state.set(hex);
  }

  setFromHSB(h: number, s: number, b: number) {
    const rgb = this.#engine.hsbToRgb(h, s, b)
    const hex = this.#engine.rgbToHex(rgb)
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

  #hexToHsl(hex: string): HSL {
    return this.#engine.rgbToHsl(this.#engine.hexToRgb(hex));
  }
}
