import { Component, EventEmitter, inject } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.html',
  styleUrl: './account.scss'
})
export class Account {
  public commonService = inject(CommonService);

  constructor() {
    this.commonService.showSubNav(true);
  }

  emitEvent() {
    this.commonService.showSubNav(false);
  }
}
