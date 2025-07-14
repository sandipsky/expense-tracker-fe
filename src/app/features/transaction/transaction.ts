import { Component, EventEmitter, inject } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-transaction',
  imports: [],
  templateUrl: './transaction.html',
  styleUrl: './transaction.scss'
})
export class Transaction {
  public commonService = inject(CommonService);

  constructor() {
    this.commonService.showSubNav(true);
  }

  emitEvent() {
    this.commonService.showSubNav(false);
  }
}
