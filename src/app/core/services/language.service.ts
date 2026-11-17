import { Injectable } from '@angular/core';

/**
 * Language switching / i18n JSON loading is disabled for now.
 * Kept as a stub so existing imports do not break.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly languages = [{ label: 'English', value: 'en' }];

  get current(): string {
    return 'en';
  }

  setLanguage(_lang: string): void {
    // no-op for now
  }
}
