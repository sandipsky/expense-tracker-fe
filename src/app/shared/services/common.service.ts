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

  sortList(data: any, active: string, direction: 'asc' | 'desc') {
    return data.sort((a: any, b: any) => {
      const valA = a[active];
      const valB = b[active];

      // --- Handle null or undefined ---
      if (valA == null && valB != null) return direction === 'asc' ? 1 : -1;
      if (valB == null && valA != null) return direction === 'asc' ? -1 : 1;
      if (valA == null && valB == null) return 0;

      // --- Handle boolean sorting (true > false) ---
      if (typeof valA === 'boolean' && typeof valB === 'boolean') {
        const strA = String(valA);   // "true" or "false"
        const strB = String(valB);   // "true" or "false"

        if (direction === 'asc') {
          return strA.localeCompare(strB);       // false < true
        } else {
          return strB.localeCompare(strA);       // true > false
        }
      }

      // --- Handle number sorting ---
      if (typeof valA === 'number' && typeof valB === 'number') {
        return direction === 'asc' ? valA - valB : valB - valA;
      }

      // --- Handle string sorting ---
      const valueA = typeof valA === 'string' ? valA.toLowerCase() : valA;
      const valueB = typeof valB === 'string' ? valB.toLowerCase() : valB;

      if (direction === 'asc') {
        return valueA?.localeCompare(valueB);
      } else {
        return valueB?.localeCompare(valueA);
      }
    });
  }
}
