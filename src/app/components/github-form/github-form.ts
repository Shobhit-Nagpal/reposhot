import { Component, computed, inject, OnDestroy, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { finalize, Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RepositoryService } from '@/app/services/repository/repository.service';
import { MaybeRepository } from '@/types';

@Component({
  selector: 'reposhot-github-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './github-form.html',
})
export class GithubForm implements OnDestroy {
  responseData = output<MaybeRepository>();

  link = signal<string>('');
  loading = signal<boolean>(false);
  protected buttonText = computed(() => (this.loading() ? 'Creating...' : 'Create snapshot'));

  #repositoryService = inject(RepositoryService);
  #snackBar = inject(MatSnackBar);
  #destroy$ = new Subject<void>();

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
    const { owner, repo } = this.#repositoryService.extractDetails(this.link());

    this.loading.set(true);

    this.#repositoryService
      .fetchRepository(owner, repo)
      .pipe(
        takeUntil(this.#destroy$),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (repo) => {
          this.responseData.emit(repo);
        },
        error: (err) => {
          this.#snackBar.open(err.message, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.unsubscribe();
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
