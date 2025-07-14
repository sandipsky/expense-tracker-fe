import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  onMenuClick = output<void>();

  emitClick() {
    this.onMenuClick.emit();
  }
}
