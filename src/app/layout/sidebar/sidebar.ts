import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from '../../shared/types/global.types';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  navData: Array<NavItem> = [
    {
      name: "Dashboard",
      icon: "dashboard",
      url: "dashboard"
    },
    {
      name: "Transactions",
      icon: "inventory",
      url: "transactions"
    },
    {
      name: "budget",
      icon: "request_page",
      url: "budget"
    },
    {
      name: "accounts",
      icon: "difference",
      url: "accounts"
    },
    {
      name: "users",
      icon: "group",
      url: "users"
    },
    {
      name: "category",
      icon: "dashboard_customize",
      url: "category"
    },
    {
      name: "reports",
      icon: "assessment",
      url: "reports"
    },
    {
      name: "Settings",
      icon: "settings",
      url: "settings"
    }
  ]
}
