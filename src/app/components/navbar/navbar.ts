import { Component, effect, inject, Renderer2, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

type ThemeMode = 'system' | 'light' | 'dark';

@Component({
  selector: 'reposhot-navbar',
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  readonly theme = signal<ThemeMode>('system');
  #renderer = inject(Renderer2);

  constructor() {
    effect(() => this.#setTheme(this.theme()));
  }

  toggleTheme() {
    const current = this.theme();
    this.theme.set(current === 'light' ? 'dark' : 'light');
  }

  #setTheme(theme: ThemeMode) {
    this.#renderer.setProperty(
      document.body.style,
      'color-scheme',
      theme === 'system' ? 'light dark' : theme,
    );
  }
}
