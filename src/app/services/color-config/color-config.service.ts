import { Injectable, signal } from '@angular/core';
import { ColorConfig } from '@/types';

@Injectable({
  providedIn: 'root',
})
export class ColorConfigService {
  readonly #defaultColors: ColorConfig = {
    backgroundColor: '#0D1117',
    textColor: '#ffffff',
  };

  readonly #storageKey = 'reposhot_color_config';

  readonly backgroundColor = signal<string>(this.#defaultColors.backgroundColor);
  readonly textColor = signal<string>(this.#defaultColors.textColor);

  constructor() {
    this.#loadFromStorage();
  }

  updateBackgroundColor(color: string): void {
    this.backgroundColor.set(color);
    this.#saveToStorage();
  }

  updateTextColor(color: string): void {
    this.textColor.set(color);
    this.#saveToStorage();
  }

  resetToDefaults(): void {
    this.backgroundColor.set(this.#defaultColors.backgroundColor);
    this.textColor.set(this.#defaultColors.textColor);
    this.#saveToStorage();
  }

  #loadFromStorage(): void {
    const stored = localStorage.getItem(this.#storageKey);
    if (stored) {
      try {
        const config: ColorConfig = JSON.parse(stored);
        this.backgroundColor.set(config.backgroundColor || this.#defaultColors.backgroundColor);
        this.textColor.set(config.textColor || this.#defaultColors.textColor);
      } catch (error) {
        console.error('Failed to parse stored color config:', error);
        this.resetToDefaults();
      }
    }
  }

  #saveToStorage(): void {
    const config: ColorConfig = {
      backgroundColor: this.backgroundColor(),
      textColor: this.textColor(),
    };
    localStorage.setItem(this.#storageKey, JSON.stringify(config));
  }
}
