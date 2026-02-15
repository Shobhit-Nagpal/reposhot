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

  onMouseUp(_e: MouseEvent) {
    this.#isMouseDown = false;
  }

  onMouseMove(e: MouseEvent) {
    this.#moveCursor(e);
  }

  #moveCursor(e: MouseEvent) {
    if (!this.#isMouseDown) {
      return;
    }

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    // X: distance from left edge / total width
    const x = ((e.clientX - rect.left) / rect.width) * 100;

    // Y: distance from top edge / total height
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Clamp to 0-100
    this.cursorX.set(Math.max(0, Math.min(100, x)));
    this.cursorY.set(Math.max(0, Math.min(100, y)));
  }

  ngOnInit(): void {
    this.cursorX.set(this.#colorService.hsl().s * 100);
    this.cursorY.set(this.#colorService.hsl().l * 100);
  }
}
