import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Canvas } from './components/canvas/canvas';
import { GithubForm } from './components/github-form/github-form';
import { MaybeRepository } from '@/types';

@Component({
  selector: 'reposhot-root',
  imports: [RouterOutlet, Navbar, Footer, Canvas, GithubForm],
  templateUrl: './app.html',
})
export class App {
  protected canvasInput = signal<MaybeRepository>(undefined);

  showHomePage() {
    if (this.canvasInput()) {
      this.canvasInput.set(undefined);
    }
  }

  onResponseData(value: MaybeRepository) {
    if (!value) {
      return;
    }
    this.canvasInput.set(value);
  }
}
