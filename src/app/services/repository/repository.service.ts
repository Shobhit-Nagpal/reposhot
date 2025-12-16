import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { environment } from '@/environments/environment';
import { MOCK_REPOSITORY_DATA } from '@/data';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  #http = inject(HttpClient);

  fetchRepository(link: string) {
    if (!environment.production) {
      return of(MOCK_REPOSITORY_DATA).pipe(delay(500));
    }
    return this.#http.get(environment.apiUrl, {
      params: {
        url: link,
      },
    });
  }
}
