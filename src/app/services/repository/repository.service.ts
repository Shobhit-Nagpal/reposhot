import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  #http = inject(HttpClient);

  fetchRepository(link: string) {
    return this.#http.get(environment.apiUrl, {
      params: {
        url: link,
      },
    });
  }
}
