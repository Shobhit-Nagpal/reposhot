import { languageIconsMap } from '@/data';

export function mapLanguageToSvg(lang: string) {
  if (lang.toLowerCase() === 'c++') {
    return languageIconsMap['cplusplus'];
  }

  return languageIconsMap[lang.toLowerCase()];
}
