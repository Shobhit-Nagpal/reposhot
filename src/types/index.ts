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

export type CanvasState = {
  backgroundColor: string;
  borderColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
}

/*
 * Color Engine Types
 */
export type RGB = {
  r: number;
  g: number;
  b: number;
  __type: ModelType.RGB;
}

export type HSL = {
  h: number;
  s: number;
  l: number;
  __type: ModelType.HSL;
}

export type ColorModel = RGB | HSL;

export enum ModelType {
  HSL = 'hsl',
  RGB = 'rgb',
}

export type ColorInputMode = 'RGB' | 'HSL' | 'HEX';

export type Hex = string;
