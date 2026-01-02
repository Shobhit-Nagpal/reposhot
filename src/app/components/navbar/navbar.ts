import { ThemeService } from '@/app/services/theme/theme.service';
import { ThemeMode } from '@/types';
import { Component, inject, OnInit, output, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'reposhot-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  logoClicked = output<boolean>();

  // Explicitly defining types fixes the "Object is of type unknown" error
  readonly #themeService: ThemeService = inject(ThemeService);
  readonly #renderer: Renderer2 = inject(Renderer2);

  protected theme = this.#themeService.theme;

  toggleTheme() {
    const current = this.#themeService.getTheme();
    const newTheme = current === 'light' ? 'dark' : 'light';
    this.#setTheme(newTheme);
  }

  onLogoClick() {
    this.logoClicked.emit(true);
  }

  ngOnInit(): void {
    this.#setBackground(this.theme());
  }

  #setTheme(theme: ThemeMode) {
    this.#themeService.setTheme(theme);
    this.#setBackground(theme);
  }

  #setBackground(theme: ThemeMode) {
    const resolvedTheme =
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme;

    // Using setStyle on document.body is safer than setProperty on .style
    this.#renderer.setStyle(
      document.body,
      'color-scheme',
      theme === 'system' ? 'light dark' : theme
    );

    // Set data-theme on document root
    this.#renderer.setAttribute(
      document.documentElement,
      'data-theme',
      resolvedTheme
    );
  }
}
