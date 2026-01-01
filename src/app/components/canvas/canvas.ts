import { Repository } from '@/types';
import { Component, ElementRef, input, viewChild } from '@angular/core';
import { domToPng } from 'modern-screenshot';

@Component({
  selector: 'reposhot-canvas',
  standalone: true,
  templateUrl: './canvas.html',
})
export class Canvas {
  canvasData = input.required<Repository>();
  cardElement = viewChild.required<ElementRef<HTMLElement>>('cardElement');

  async downloadImage() {
    const el = this.cardElement().nativeElement;

    try {
      // modern-screenshot options for high fidelity
      const dataUrl = await domToPng(el, {
        scale: 2,           // High resolution
        quality: 1,         // Maximum quality
        backgroundColor: '#0a0a0a', // Matches global background
        features: {
        }
      });

      const link = document.createElement('a');
      link.download = `RS-${this.canvasData().name.toUpperCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Snapshot failed:', err);
    }
  }
}
