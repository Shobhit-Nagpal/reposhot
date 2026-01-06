import { Component, inject, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Canvas } from './components/canvas/canvas';
import { GithubForm } from './components/github-form/github-form';
import { Sidebar } from './components/sidebar/sidebar';
import { MaybeRepository } from '@/types';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'reposhot-root',
  imports: [RouterOutlet, Navbar, Footer, Canvas, GithubForm, Sidebar, MatSidenavModule, MatButtonModule, MatIconModule],
  templateUrl: './app.html',
})
export class App {
  protected canvasInput = signal<MaybeRepository>(undefined);
  protected sidenavOpened = signal<boolean>(true);
  protected isMobile = signal<boolean>(false);
  
  sidenav = viewChild<MatSidenav>('sidenav');
  
  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    // Observe mobile breakpoint
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile.set(result.matches);
      // On mobile, close sidebar by default
      if (result.matches) {
        this.sidenavOpened.set(false);
      } else {
        this.sidenavOpened.set(true);
      }
    });
  }

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

  toggleSidenav() {
    this.sidenav()?.toggle();
  }
}
