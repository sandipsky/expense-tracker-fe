import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [CommonModule]
})
export class LoadingSpinnerComponent {
  commonService = inject(CommonService);
}
