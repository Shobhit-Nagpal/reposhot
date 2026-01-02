import { Repository } from '@/types';

export const MOCK_REPOSITORY_DATA: Repository = {
  link: 'https://github.com/torvalds/linux',
  stars: 212_000,
  issues: 5_000,
  forks: 59_600,
  owner: 'torvalds',
  avatarUrl: 'https://avatars.githubusercontent.com/u/1024025?v=4',
  name: 'linux',
  description: 'Linux kernel source tree',
};

export const languageIconsMap: Record<string, string> = {
  typescript: 'typescript/typescript-original.svg',
  javascript: 'javascript/javascript-original.svg',
  c: 'c/c-original.svg',
  cplusplus: 'cplusplus/cplusplus-original.svg',
  csharp: 'csharp/csharp-original.svg',
  python: 'python/python-original.svg',
  zig: 'zig/zig-original.svg',
  css: 'css3/css3-original.svg',
  scss: 'sass/sass-original.svg',
  rust: 'rust/rust-original.svg',
  go: 'go/go-original-wordmark.svg',
  dockerfile: 'docker/docker-original.svg',
  shell: 'bash/bash-plain.svg',
  powershell: 'powershell/powershell-original.svg',
  cmake: 'cmake/cmake-original.svg',
  nix: 'nixos/nixos-original.svg',
  lua: 'lua/lua-original.svg',
  elixir: 'elixir/elixir-original.svg',
  php: 'php/php-original.svg',
  java: 'java/java-original.svg',
};

export const devIconsCdn = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
