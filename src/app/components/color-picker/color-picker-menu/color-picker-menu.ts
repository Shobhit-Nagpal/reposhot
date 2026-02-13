import { Component, computed, model, signal } from '@angular/core';
import { HueSlider } from './hue-slider/hue-slider';
import { AlphaSlider } from './alpha-slider/alpha-slider';

@Component({
  selector: 'reposhot-color-picker-menu',
  imports: [HueSlider, AlphaSlider],
  templateUrl: './color-picker-menu.html',
})
export class ColorPickerMenu {
  value = model('');

  // Signals to pick up from children
  hue = signal(0);
  saturation = signal(0);
  lightness = signal(0);

  previewValue = computed(() =>
    this.#calculateHexValue(this.hue(), this.saturation(), this.lightness()),
  );

  #calculateHexValue(h: number, s: number, l: number) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0'); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  protected onCancel() {}

  protected onSave() {}
}
