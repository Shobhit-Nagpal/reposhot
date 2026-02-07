import { StoreService } from '@/app/services/store/store.service';
import { Component, ElementRef, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'reposhot-sidesheet-controls',
  imports: [MatSidenavModule, MatButtonModule],
  templateUrl: './sidesheet-controls.html',
  styleUrl: './sidesheet-controls.css',
})
export class Sidesheet {
  canvasEl = input.required<ElementRef<HTMLCanvasElement>>();
  #imageName = 'reposhot-image.png';

  #storeService = inject(StoreService);

  protected downloadImage() {
    const canvasURL = this.canvasEl().nativeElement.toDataURL();
    const el = document.createElement('a');
    el.href = canvasURL;
    el.download = this.#imageName;
    el.click();
    el.remove();
  }

  protected onBackgroundColorChange(event: Event) {
    const bgColor = (event.target as HTMLInputElement).value;
    this.#storeService.updateState({
      backgroundColor: bgColor,
    });
  }

  protected onBorderColorChange(event: Event) {
    const borderColor = (event.target as HTMLInputElement).value;
    this.#storeService.updateState({
      borderColor: borderColor,
    });
  }

  protected onPrimaryTextColorChange(event: Event) {
    const pTextColor = (event.target as HTMLInputElement).value;
    this.#storeService.updateState({
      primaryTextColor: pTextColor,
    });
  }

  protected onSecondaryTextColorChange(event: Event) {
    const sTextColor = (event.target as HTMLInputElement).value;
    this.#storeService.updateState({
      secondaryTextColor: sTextColor,
    });
  }
}
