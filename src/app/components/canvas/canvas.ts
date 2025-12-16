import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'reposhot-canvas',
  imports: [],
  templateUrl: './canvas.html',
})
export class Canvas implements AfterViewInit {
  canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  #ctx: CanvasRenderingContext2D;

  draw() {
    this.#ctx.fillStyle = 'blue';
    this.#ctx.fillRect(10, 10, 150, 100);
  }

  ngAfterViewInit(): void {
    this.#ctx = this.canvas().nativeElement.getContext('2d') as CanvasRenderingContext2D;
    this.draw();
  }
}
