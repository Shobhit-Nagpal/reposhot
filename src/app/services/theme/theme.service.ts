import { ThemeMode } from '@/types';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly #defaultTheme = 'system';
  readonly #themeKey = 'reposhot_theme';

  readonly theme = signal<ThemeMode>(this.#defaultTheme);

  constructor() {
    this.theme.set(this.getTheme());
  }

  getTheme(): ThemeMode {
    const currTheme = localStorage.getItem(this.#themeKey);

    if (!currTheme) {
      this.setTheme(this.#defaultTheme);
      return this.#defaultTheme as ThemeMode;
    }

    return currTheme as ThemeMode;
  }

  setTheme(theme: ThemeMode) {
    localStorage.setItem(this.#themeKey, theme);
    this.theme.set(theme);
  }
}
