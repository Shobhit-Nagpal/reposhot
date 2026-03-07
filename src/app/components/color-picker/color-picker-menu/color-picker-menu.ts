import { Component, computed, effect, inject, input, OnInit, output } from '@angular/core';
import { HueSlider } from './hue-slider/hue-slider';
import { ColorInputs } from './color-inputs/color-inputs';
import { GradientPicker } from './gradient-picker/gradient-picker';
import { ColorService } from '@/app/services/color/color.service';

@Component({
  selector: 'reposhot-color-picker-menu',
  imports: [HueSlider, ColorInputs, GradientPicker],
  templateUrl: './color-picker-menu.html',
})
export class ColorPickerMenu implements OnInit {
  value = input.required<string>();

  valueChange = output<string>();

  #colorService = inject(ColorService);

  hue = computed(() => this.#colorService.hsl().h);

  constructor() {
    effect(() => {
      this.valueChange.emit(this.#colorService.currentColor());
    });
  }

  ngOnInit(): void {
    this.#colorService.set(this.value());
  }
}
