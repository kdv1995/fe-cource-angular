import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  constructor(@Inject(LOCALE_ID) public locale: string) {}

  getCurrentLocale() {
    return this.locale;
  }
  setLocale(locale: string): void {
    this.locale = locale;
  }
}
