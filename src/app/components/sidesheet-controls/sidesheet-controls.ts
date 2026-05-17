import { StoreService } from '@/app/services/store/store.service';
import { Component, computed, ElementRef, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ColorPicker } from '../color-picker/color-picker';
import { MatTabsModule } from '@angular/material/tabs';
import { themes } from '@/data';
import { Theme } from '@/types';

@Component({
  selector: 'reposhot-sidesheet-controls',
  imports: [MatSidenavModule, MatButtonModule, MatTabsModule, ColorPicker],
  templateUrl: './sidesheet-controls.html',
})
export class SidesheetControls {
  canvasEl = input.required<ElementRef<HTMLCanvasElement> | null>();
  imageName = input<string>('reposhot-image.png');

  #storeService = inject(StoreService);

  state = computed(() => this.#storeService.state());
  themes = signal(themes).asReadonly();

  protected downloadImage() {
    const canvasURL = this.canvasEl()?.nativeElement?.toDataURL();
    if (!canvasURL) {
      return;
    }
    const el = document.createElement('a');
    el.href = canvasURL;
    el.download = this.#ensurePngSuffix(this.imageName());
    el.click();
    el.remove();
  }

  protected onSelectTheme(theme: Theme) {
    this.#storeService.updateState({
      backgroundColor: theme.backgroundColor,
      primaryTextColor: theme.primaryTextColor,
      borderColor: theme.borderColor,
      secondaryTextColor: theme.secondaryTextColor,
    });
  }

  protected onBackgroundColorChange(color: string) {
    this.#storeService.updateState({
      backgroundColor: color,
    });
  }

  protected onBorderColorChange(color: string) {
    this.#storeService.updateState({
      borderColor: color,
    });
  }

  protected onPrimaryTextColorChange(color: string) {
    this.#storeService.updateState({
      primaryTextColor: color,
    });
  }

  protected onSecondaryTextColorChange(color: string) {
    this.#storeService.updateState({
      secondaryTextColor: color,
    });
  }

  #ensurePngSuffix(name: string): string {
    if (name.endsWith('.png')) {
      return name;
    }

    return `${name}.png`
  }
}
