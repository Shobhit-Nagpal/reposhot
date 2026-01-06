import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ColorConfigService } from '@/app/services/color-config/color-config.service';

@Component({
  selector: 'reposhot-sidebar',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  protected readonly colorConfig = inject(ColorConfigService);
  protected backgroundColor = this.colorConfig.backgroundColor;
  protected textColor = this.colorConfig.textColor;

  onBackgroundColorChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.colorConfig.updateBackgroundColor(input.value);
  }

  onTextColorChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.colorConfig.updateTextColor(input.value);
  }

  resetColors(): void {
    this.colorConfig.resetToDefaults();
  }
}
