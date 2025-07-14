import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private showSubNavSubject = new BehaviorSubject<boolean>(true);
  private showSideNavSubject = new BehaviorSubject<boolean>(true);

  showSubNav$ = this.showSubNavSubject.asObservable();
  showSideNav$ = this.showSideNavSubject.asObservable();

  showSubNav(value: boolean): void {
    this.showSubNavSubject.next(value);
  }

  showSideNav(value: boolean): void {
    this.showSideNavSubject.next(value);
  }
}
