import { Component, inject } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss'
})
export class Calendar {
  public commonService = inject(CommonService);

}
