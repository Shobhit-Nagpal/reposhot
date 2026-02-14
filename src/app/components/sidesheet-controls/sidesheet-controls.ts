import { StoreService } from '@/app/services/store/store.service';
import { Component, computed, ElementRef, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ColorPicker } from '../color-picker/color-picker';

@Component({
  selector: 'reposhot-sidesheet-controls',
  imports: [MatSidenavModule, MatButtonModule, ColorPicker],
  templateUrl: './sidesheet-controls.html',
  styleUrl: './sidesheet-controls.css',
})
export class SidesheetControls {
  canvasEl = input.required<ElementRef<HTMLCanvasElement>>();
  #imageName = 'reposhot-image.png';

  #storeService = inject(StoreService);

  state = computed(() => this.#storeService.state());

  protected downloadImage() {
    const canvasURL = this.canvasEl().nativeElement.toDataURL();
    const el = document.createElement('a');
    el.href = canvasURL;
    el.download = this.#imageName;
    el.click();
    el.remove();
  }

  protected onBackgroundColorChange(color: string) {
    this.#storeService.updateState({
      backgroundColor: color,
    });
  }

  protected onBackgroundColorAlphaChange(alpha: number) {
    console.log('sup')
    this.#storeService.updateState({
      backgroundColorAlpha: alpha,
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
}
