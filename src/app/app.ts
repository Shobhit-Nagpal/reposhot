import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Canvas } from './components/canvas/canvas';
import { GithubForm } from './components/github-form/github-form';

@Component({
  selector: 'reposhot-root',
  imports: [RouterOutlet, Navbar, Footer, Canvas, GithubForm],
  templateUrl: './app.html',
})
export class App {
  protected showCanvas = signal(false);

  onFormFilled(value: boolean) {
    if (value) {
      this.showCanvas.set(true);
    } else {
      this.showCanvas.set(false);
    }
  }
}
