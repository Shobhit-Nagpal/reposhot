import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { environment } from '@/environments/environment';
import { MOCK_REPOSITORY_DATA } from '@/data';
import { ApiResponse, Repository } from '@/types';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  #http = inject(HttpClient);

  fetchRepository(owner: string, repo: string): Observable<Repository> {
    if (!environment.allowApiCalls) {
      return of(MOCK_REPOSITORY_DATA).pipe(delay(500));
    }
    return this.#http
      .get<ApiResponse<Repository>>(environment.apiUrl + '/info', {
        params: {
          owner,
          repo,
        },
      })
      .pipe(
        map((response) => {
          if (!response.success || response.error) {
            throw new Error(response.error || 'Failed to fetch repository');
          }

          if (!response.data) {
            throw new Error('No repository data returned');
          }

          return response.data;
        }),
        catchError((err) => {
          // Handle HTTP errors (network, 404, 500, etc.)
          const message = err.error?.error || err.message || 'Failed to fetch repository';
          return throwError(() => new Error(message));
        }),
      );
  }

  extractDetails(link: string): { owner: string; repo: string } {
    const cleanLink = link.endsWith('/') ? link.slice(0, -1) : link;

    const linkParts = cleanLink.split('/');

    const repo = linkParts[linkParts.length - 1];
    const owner = linkParts[linkParts.length - 2];

    return {
      owner,
      repo,
    };
  }
}
