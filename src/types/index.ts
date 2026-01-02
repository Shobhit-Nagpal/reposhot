export interface Repository {
  link: string;
  stars: number;
  forks: number;
  owner: string;
  avatarUrl: string;
  name: string;
  issues: number;
  description?: string;
  topLanguages?: string[];
}

export type MaybeRepository = Repository | undefined;

export type ThemeMode = 'system' | 'light' | 'dark';

export type ApiResponse<T> = {
  success: boolean;
  error?: string;
  data?: T;
};
