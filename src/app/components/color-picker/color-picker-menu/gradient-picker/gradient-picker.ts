import { ColorService } from '@/app/services/color/color.service';
import { Component, effect, inject, input, model, OnInit, signal } from '@angular/core';

@Component({
  selector: 'reposhot-gradient-picker',
  imports: [],
  templateUrl: './gradient-picker.html',
})
export class GradientPicker implements OnInit {
  hue = input.required<number>();

  cursorX = signal(100);
  cursorY = signal(100);

  #colorService = inject(ColorService);

  onMouseDown(e: Event) {
    console.log('on mouse down')
  }

  ngOnInit(): void {
    this.cursorX.set(this.#colorService.hsl().s * 100);
    this.cursorY.set(this.#colorService.hsl().l * 100);
  }
}
