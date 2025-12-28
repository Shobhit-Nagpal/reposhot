export interface Repository {
  link: string;
  stars: number;
  contributors: number;
  forks: number;
  owner: string;
  avatarUrl: string;
  name: string;
  description?: string;
}

export type MaybeRepository = Repository | undefined;

export type ThemeMode = 'system' | 'light' | 'dark';
