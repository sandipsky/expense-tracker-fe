import { Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Header } from "./header/header";
import { Sidebar } from './sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [MatSidenavModule, Header, Sidebar, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  isSmallScreen: boolean = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 700) {
      this.isSmallScreen = true;
    }
    else {
      this.isSmallScreen = false;
    }
  }
}
