import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  private languageSubject = new BehaviorSubject<string>('en');
  public language$ = this.languageSubject.asObservable();
  public setLanguage(language: string) {
    this.languageSubject.next(language);
  }
}
