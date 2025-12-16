import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RepositoryService } from '../../services/repository/repository.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'reposhot-github-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './github-form.html',
})
export class GithubForm {
  link = signal<string>('');
  #repositoryService = inject(RepositoryService);
  #response$: Observable<object>;

  onInputEvent(event: Event) {
    this.link.set((event.target as HTMLInputElement).value);
  }

  onSubmit() {
    if (!this.#isValidInput()) {
      return;
    }
    this.#response$ = this.#repositoryService.fetchRepository(this.link());
    this.#response$.subscribe((res) => {
      console.log(res);
    });
  }

  #isValidInput() {
    return true;
  }
}
