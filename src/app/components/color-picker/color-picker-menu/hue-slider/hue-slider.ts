import { ColorService } from '@/app/services/color/color.service';
import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'reposhot-hue-slider',
  imports: [MatSliderModule],
  templateUrl: './hue-slider.html',
})
export class HueSlider implements OnInit {
  value = input.required<number>();

  hue = signal<number>(0);

  #colorService = inject(ColorService);

  constructor() {
    effect(() => {
      this.hue.set(this.#colorService.hsl().h);
    });
  }

  onSliderInputChange(e: Event) {
    const value = parseInt((e.target as HTMLInputElement).value);
    this.#colorService.setHue(value);
  }

  ngOnInit(): void {
    this.hue.set(this.value());
  }
}
