import { Component, inject, OnDestroy, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RepositoryService } from '@/app/services/repository/repository.service';

@Component({
  selector: 'reposhot-github-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './github-form.html',
})
export class GithubForm implements OnDestroy {
  formFilled = output<boolean>();

  link = signal<string>('');
  #repositoryService = inject(RepositoryService);
  #snackBar = inject(MatSnackBar);
  #response$: Subscription;

  onInputEvent(event: Event) {
    this.link.set((event.target as HTMLInputElement).value);
  }

  onSubmit() {
    if (!this.#isValidInput()) {
      this.#snackBar.open('Invalid GitHub repository URL', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }
    this.#response$ = this.#repositoryService.fetchRepository(this.link()).subscribe((res) => {
      console.log(res);
      this.formFilled.emit(true);
    });
  }

  ngOnDestroy(): void {
    this.#response$.unsubscribe();
  }

  #isValidInput() {
    if (this.link().length === 0) {
      return false;
    }

    try {
      const url = new URL(this.link());

      if (url.protocol !== 'https:') {
        return false;
      }

      if (url.hostname !== 'github.com') {
        return false;
      }

      // Validate path structure
      const path = url.pathname;

      // Remove trailing slash if exists
      const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;

      // Remove .git suffix if exists
      const withoutGit = cleanPath.endsWith('.git') ? cleanPath.slice(0, -4) : cleanPath;

      // Split and validate parts
      const parts = withoutGit.split('/').filter((p) => p.length > 0);

      if (parts.length !== 2) {
        return false;
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
