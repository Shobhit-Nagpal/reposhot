import { Component, computed, effect, inject, input, OnInit, output } from '@angular/core';
import { HueSlider } from './hue-slider/hue-slider';
import { ColorInputs } from './color-inputs/color-inputs';
import { GradientPicker } from './gradient-picker/gradient-picker';
import { ColorService } from '@/app/services/color/color.service';
import { AlphaSlider } from './alpha-slider/alpha-slider';

@Component({
  selector: 'reposhot-color-picker-menu',
  imports: [HueSlider, ColorInputs, GradientPicker, AlphaSlider],
  templateUrl: './color-picker-menu.html',
})
export class ColorPickerMenu implements OnInit {
  value = input.required<string>();
  valueChange = output<string>();
  alphaChange = output<number>();

  #colorService = inject(ColorService);

  hue = computed(() => this.#colorService.hsl().h);
  alpha = computed(() => this.#colorService.hsl().a ?? 1);

  constructor() {
    effect(() => {
      this.valueChange.emit(this.#colorService.currentColor());
    });

    effect(() => {
      this.alphaChange.emit(this.alpha() ?? 1);
    });
  }

  ngOnInit(): void {
    this.#colorService.set(this.value());
  }
}
