import { ColorService } from '@/app/services/color/color.service';
import { Component, inject, input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'reposhot-gradient-picker',
  imports: [],
  templateUrl: './gradient-picker.html',
})
export class GradientPicker implements OnInit {
  hue = input.required<number>();

  cursorX = signal(0);
  cursorY = signal(0);

  #colorService = inject(ColorService);
  #isMouseDown = false;

  onMouseDown(_e: MouseEvent) {
    this.#isMouseDown = true;
  }

  onMouseUp(e: MouseEvent) {
    const [x, y] = this.#calculateMouseEventCoords(e);

    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));

    if (this.cursorX() !== clampedX) {
      this.cursorX.set(clampedX);
    }

    if (this.cursorY() !== clampedY) {
      this.cursorY.set(clampedY);
    }

    this.#colorService.setSaturation(clampedX / 100);
    this.#colorService.setLightness(1 - clampedY / 100);

    this.#isMouseDown = false;
  }

  onMouseMove(e: MouseEvent) {
    this.#moveCursor(e);
  }

  #moveCursor(e: MouseEvent) {
    if (!this.#isMouseDown) {
      return;
    }

    const [x, y] = this.#calculateMouseEventCoords(e);

    // Clamp to 0-100
    this.cursorX.set(Math.max(0, Math.min(100, x)));
    this.cursorY.set(Math.max(0, Math.min(100, y)));
  }

  #calculateMouseEventCoords(e: MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    // X: distance from left edge / total width
    const x = ((e.clientX - rect.left) / rect.width) * 100;

    // Y: distance from top edge / total height
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    return [x, y];
  }

  ngOnInit(): void {
    this.cursorX.set(this.#colorService.hsl().s * 100);
    this.cursorY.set(this.#colorService.hsl().l * 100);
  }
}
