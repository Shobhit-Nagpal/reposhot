import { Component, model } from '@angular/core';
import { ColorPickerMenu } from './color-picker-menu/color-picker-menu';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'reposhot-color-picker',
  imports: [ColorPickerMenu, MatMenuModule],
  templateUrl: './color-picker.html',
})
export class ColorPicker {
  value = model('');
}
