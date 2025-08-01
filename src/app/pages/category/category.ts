import { Component, inject } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.scss'
})
export class Category {
  public commonService = inject(CommonService);
}
