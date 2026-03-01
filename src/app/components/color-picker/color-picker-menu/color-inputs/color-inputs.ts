import { ColorService } from '@/app/services/color/color.service';
import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'reposhot-color-inputs',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './color-inputs.html',
})
export class ColorInputs implements OnInit {
  value = input.required<string>();
  color = signal<string>('');

  #colorService = inject(ColorService);

  constructor() {
    effect(() => {
      this.color.set(this.#colorService.currentColor());
    });
  }

  protected onInputChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    if (value.length < 6) {
      return;
    } else {
      this.#colorService.set(this.#ensureHash(value));
    }
  }

  #ensureHash(value: string) {
    if (value[0] === '#') {
      return value;
    } else {
      return '#' + value;
    }
  }

  ngOnInit(): void {
    this.color.set(this.value());
  }
}
