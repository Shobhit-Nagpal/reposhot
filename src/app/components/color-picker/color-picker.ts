import { Component, input, output } from '@angular/core';
import { ColorPickerMenu } from './color-picker-menu/color-picker-menu';
import { MatMenuModule } from '@angular/material/menu';
import { ColorService } from '@/app/services/color/color.service';

@Component({
  selector: 'reposhot-color-picker',
  imports: [ColorPickerMenu, MatMenuModule],
  providers: [ColorService],
  templateUrl: './color-picker.html',
})
export class ColorPicker {
  value = input.required<string>();
  valueChange = output<string>();

  alphaChange = output<number>();

  onValueChange(v: string) {
    this.valueChange.emit(v);
  }

  onAlphaChange(v: number) {
    this.alphaChange.emit(v);
  }
}
