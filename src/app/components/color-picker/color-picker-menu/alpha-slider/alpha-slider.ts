import { ColorService } from '@/app/services/color/color.service';
import { Component, inject, input, signal } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'reposhot-alpha-slider',
  imports: [MatSliderModule],
  templateUrl: './alpha-slider.html',
})
export class AlphaSlider {
  value = input.required<number>();

  alpha = signal<number>(0);

  #colorService = inject(ColorService);

  onSliderInputChange(e: Event) {
    const value = parseFloat((e.target as HTMLInputElement).value);
    this.#colorService.setAlpha(value);
  }

  ngOnInit(): void {
    this.alpha.set(this.value());
  }
}
