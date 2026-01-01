import { Repository } from '@/types';
import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  canvas,
  canvasUi,
  drawAvatar,
  drawBackground,
  drawLogo,
  drawRepoInfo,
  drawStats,
  Q1,
  Q2,
  Q3,
  Q4,
  quadrant,
} from './canvas.utils';

@Component({
  selector: 'reposhot-canvas',
  imports: [MatButtonModule],
  templateUrl: './canvas.html',
})
export class Canvas implements AfterViewInit {
  canvasData = input.required<Repository>();
  canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('reposhotCanvas');

  #ctx: CanvasRenderingContext2D;
  #imageName = 'reposhot-image.png';

  ngAfterViewInit(): void {
    this.#initSetup();
  }

  #draw() {
    this.#drawSnapshot();
  }

  #drawSnapshot() {
    drawBackground(this.#ctx, canvasUi.backgroundColor, canvas.width, canvas.height);
    drawAvatar(this.#ctx, this.canvasData().avatarUrl, Q2.x, Q2.y, quadrant.width, quadrant.height);
    drawRepoInfo(
      this.#ctx,
      this.canvasData().owner,
      this.canvasData().name,
      this.canvasData().description,
      Q1.x,
      Q1.y,
      quadrant.width,
      quadrant.height,
    );
    drawStats(
      this.#ctx,
      {
        stars: this.canvasData().stars,
        forks: this.canvasData().forks,
        issues: this.canvasData().issues,
      },
      Q3.x,
      Q3.y,
      quadrant.width,
      quadrant.height,
    );
    drawLogo(this.#ctx, Q4.x, Q4.y, quadrant.width, quadrant.height);
  }

  #setupCanvas() {
    const canvasEl = this.canvas().nativeElement;
    const dpr = window.devicePixelRatio || 1;

    // Set actual canvas buffer size (high-res)
    canvasEl.width = canvas.width * dpr;
    canvasEl.height = canvas.height * dpr;

    // Set CSS display size (what user sees)
    canvasEl.style.width = '100%';
    canvasEl.style.height = 'auto';
    canvasEl.style.maxWidth = canvasEl.width + 'px';

    this.#ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;

    // Scale all drawing operations
    this.#ctx.scale(dpr, dpr);
  }

  #initSetup() {
    this.#setupCanvas();
    this.#draw();
  }

  downloadImage() {
    const canvasURL = this.canvas().nativeElement.toDataURL();
    const el = document.createElement('a');
    el.href = canvasURL;
    el.download = this.#imageName;
    el.click();
    el.remove();
  }
}
