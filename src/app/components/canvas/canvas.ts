import { Repository } from '@/types';
import { Component, ElementRef, inject, input, viewChild, effect, AfterViewInit, HostListener } from '@angular/core';
import { ThemeService } from '@/app/services/theme/theme.service';

@Component({
  selector: 'reposhot-canvas',
  standalone: true,
  templateUrl: './canvas.html',
})
export class Canvas implements AfterViewInit {
  canvasData = input.required<Repository>();
  reposhotCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('reposhotCanvas');
  protected themeService = inject(ThemeService);

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private avatarImage: HTMLImageElement | null = null;
  private dpr = window.devicePixelRatio || 1;

  // Base design dimensions
  private readonly BASE_WIDTH = 650;
  private readonly BASE_HEIGHT = 350;

  constructor() {
    effect(() => {
      this.canvasData();
      this.themeService.theme();
      if (this.canvas && this.ctx) {
        this.drawCanvas();
      }
    });
  }

  // Redraw when the window is resized
  @HostListener('window:resize')
  onResize() {
    if (this.canvas && this.ctx) {
      this.drawCanvas();
    }
  }

  ngAfterViewInit() {
    this.canvas = this.reposhotCanvas().nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.loadImageAndDraw();
  }

  getResolvedTheme(): 'light' | 'dark' {
    const currentTheme = this.themeService.theme();
    if (currentTheme !== 'system') {
      return currentTheme as 'light' | 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private async loadImageAndDraw() {
    const data = this.canvasData();
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.avatarImage = img;
      this.drawCanvas();
    };
    img.onerror = () => {
      console.error('Failed to load avatar image');
      this.drawCanvas();
    };
    img.src = data.avatarUrl;
  }

  private drawCanvas() {
    const data = this.canvasData();
    const isDark = this.getResolvedTheme() === 'dark';

    const actualWidth = Math.min(this.BASE_WIDTH, window.innerWidth - 32);
    const scaleFactor = actualWidth / this.BASE_WIDTH;
    const actualHeight = this.BASE_HEIGHT * scaleFactor;

    this.canvas.width = actualWidth * this.dpr;
    this.canvas.height = actualHeight * this.dpr;

    this.canvas.style.width = `${actualWidth}px`;
    this.canvas.style.height = `${actualHeight}px`;

    // Reset and apply Scale: DPR (for retina) * ScaleFactor (for responsiveness)
    this.ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformations
    this.ctx.scale(this.dpr * scaleFactor, this.dpr * scaleFactor);

    const width = this.BASE_WIDTH;
    const height = this.BASE_HEIGHT;

    const colors = isDark ? {
      bg: '#010409',
      border: '#1f1f22',
      text: '#e4e4e7',
      textSecondary: '#71717a',
      textTertiary: '#52525b',
      shadow: 'rgba(0, 0, 0, 0.5)',
      divider: 'rgba(255, 255, 255, 0.05)',
    } : {
      bg: '#ffffff',
      border: '#e4e4e7',
      text: '#18181b',
      textSecondary: '#71717a',
      textTertiary: '#52525b',
      shadow: 'rgba(228, 228, 231, 0.5)',
      divider: '#f4f4f5',
    };

    this.ctx.clearRect(0, 0, width, height);

    // Background Shadow
    this.ctx.shadowColor = colors.shadow;
    this.ctx.shadowBlur = 30;
    this.ctx.shadowOffsetY = 10;
    this.ctx.fillStyle = colors.bg;
    this.roundRect(0, 0, width, height, 8);
    this.ctx.fill();

    // Border
    this.ctx.shadowColor = 'transparent';
    this.ctx.strokeStyle = colors.border;
    this.ctx.lineWidth = 1;
    this.roundRect(0, 0, width, height, 8);
    this.ctx.stroke();

    // Mac-style Red Dot
    const redDotX = 32;
    const redDotY = 24;
    this.ctx.shadowColor = '#ff5f56';
    this.ctx.shadowBlur = isDark ? 10 : 8;
    this.ctx.fillStyle = '#ff5f56';
    this.ctx.beginPath();
    this.ctx.arc(redDotX, redDotY, 5, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0;

    const padding = 32;
    const leftX = padding;
    let currentY = 60;

    // Repo Name
    this.ctx.font = '600 14px "JetBrains Mono", monospace';
    this.ctx.fillStyle = colors.textSecondary;
    const repoText = `${data.owner}/${data.name}`;
    this.ctx.fillText(repoText, leftX, currentY);

    // Badge
    const repoTextWidth = this.ctx.measureText(repoText).width;
    const badgeX = leftX + repoTextWidth + 12;
    const badgeY = currentY - 14;
    const badgeText = `${data.stars} STARS`;
    this.ctx.font = 'bold 10px "JetBrains Mono", monospace';
    const badgeWidth = this.ctx.measureText(badgeText).width + 16;
    this.ctx.strokeStyle = isDark ? '#27272a' : colors.border;
    this.roundRect(badgeX, badgeY, badgeWidth, 20, 4);
    this.ctx.stroke();
    this.ctx.fillStyle = isDark ? '#a1a1aa' : colors.textSecondary;
    this.ctx.fillText(badgeText, badgeX + 8, badgeY + 14);

    currentY += 40;

    // Description (Wrapped)
    this.ctx.font = 'bold 24px "JetBrains Mono", monospace';
    this.ctx.fillStyle = colors.text;
    const description = data.description || 'No description provided';
    const maxWidth = width - padding * 2 - 250; // Leave room for avatar
    const lines = this.wrapText(description.toUpperCase(), maxWidth);
    lines.forEach((line, index) => {
      this.ctx.fillText(line, leftX, currentY + (index * 32));
    });

    currentY += lines.length * 32 + 30;

    // Metadata
    this.ctx.font = '500 11px "JetBrains Mono", monospace';
    this.ctx.fillStyle = colors.textSecondary;
    this.ctx.fillText(`UPDATED 2H AGO // ${data.issues} ISSUES`, leftX, currentY);

    currentY += 40;

    // Divider Line
    this.ctx.strokeStyle = colors.divider;
    this.ctx.beginPath();
    this.ctx.moveTo(leftX, currentY);
    this.ctx.lineTo(width - padding - 250, currentY);
    this.ctx.stroke();

    currentY += 30;

    // System Contributors Section
    this.ctx.font = '600 10px "JetBrains Mono", monospace';
    this.ctx.fillStyle = colors.textTertiary;
    this.ctx.letterSpacing = '0.2em';
    this.ctx.fillText('SYSTEM CONTRIBUTORS', leftX, currentY);

    currentY += 25;
    if (this.avatarImage) {
      this.ctx.save();
      this.ctx.filter = 'grayscale(100%) opacity(50%)';
      this.ctx.drawImage(this.avatarImage, leftX, currentY - 15, 20, 20);
      this.ctx.restore();
    }
    this.ctx.font = '600 10px "JetBrains Mono", monospace';
    this.ctx.fillStyle = colors.textSecondary;
    this.ctx.fillText(data.owner.toUpperCase(), leftX + 28, currentY);

    // Main Avatar (Right side)
    const avatarSize = 224;
    const avatarX = width - padding - avatarSize;
    const avatarY = (height - avatarSize) / 2;

    this.ctx.strokeStyle = isDark ? '#27272a' : colors.border;
    this.ctx.lineWidth = 4;
    this.ctx.strokeRect(avatarX - 4, avatarY - 4, avatarSize + 8, avatarSize + 8);
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(avatarX - 4, avatarY - 4, avatarSize + 8, avatarSize + 8);

    if (this.avatarImage) {
      this.ctx.save();
      this.ctx.filter = `grayscale(100%) contrast(125%) brightness(${isDark ? 75 : 110}%)`;
      this.ctx.drawImage(this.avatarImage, avatarX, avatarY, avatarSize, avatarSize);
      this.ctx.restore();
    }
  }

  // Helper methods (unchanged logic, just inside context of scaled drawing)
  private roundRect(x: number, y: number, width: number, height: number, radius: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
  }

  private wrapText(text: string, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = this.ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  async downloadImage() {
    try {
      const dataUrl = this.canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `RS-${this.getResolvedTheme().toUpperCase()}-${this.canvasData().name.toUpperCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Snapshot failed', err);
    }
  }
}
