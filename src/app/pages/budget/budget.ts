import { Component, EventEmitter, inject } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-budget',
  imports: [],
  templateUrl: './budget.html',
  styleUrl: './budget.scss'
})
export class Budget {
  public commonService = inject(CommonService);

  constructor() {
    this.commonService.showSubNav(true);
  }

  emitEvent() {
    this.commonService.showSubNav(false);
  }
}
