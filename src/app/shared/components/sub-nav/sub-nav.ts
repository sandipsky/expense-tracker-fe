import { Component, inject, input, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../types/global.types';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sub-nav',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sub-nav.html',
  styleUrl: './sub-nav.scss'
})
export class SubNav {
  @Input() data: Array<NavItem> = [];

  commonService = inject(CommonService);
}
