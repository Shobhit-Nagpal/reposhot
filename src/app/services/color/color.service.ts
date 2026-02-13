import { ColorEngine } from '@/core/color-engine/engine';
import { ColorModel } from '@/types';
import { computed, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  #engine = new ColorEngine();

  currentColor = computed(() => this.#engine.state);

  setColor(color: ColorModel) {
    this.#engine.state = color;
  }

  convertToRgb() {
    return this.#engine.hslToRgb(this.#engine.state);
  }
}
