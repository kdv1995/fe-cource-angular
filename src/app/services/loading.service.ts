import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();
  constructor() {}
  /**
   * startLoading
   */
  public startLoading() {
    this.loadingSubject.next(true);
  }
  /**
   * stopLoading
   */
  public stopLoading() {
    this.loadingSubject.next(false);
  }
}
