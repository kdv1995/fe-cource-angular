import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  currentLanguage: string = 'pt';
  constructor() {}
  setLanguage(language: string): void {
    this.currentLanguage = language;
  }

  getLanguage(): string {
    return this.currentLanguage;
  }
}
