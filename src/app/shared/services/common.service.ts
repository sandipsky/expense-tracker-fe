import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private showSubNavSubject = new BehaviorSubject<boolean>(true);
  private showSpinnerSubject = new BehaviorSubject<boolean>(false);

  showSubNav$ = this.showSubNavSubject.asObservable();
  showSpinner$ = this.showSpinnerSubject.asObservable();

  showSubNav(value: boolean): void {
    this.showSubNavSubject.next(value);
  }

  showSpinner(): void {
    this.showSpinnerSubject.next(true);
  }

  hideSpinner(): void {
    this.showSpinnerSubject.next(false);
  }
}
