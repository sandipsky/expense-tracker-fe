import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DropdownMenuComponent } from '../../shared/components/dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, DropdownMenuComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  onMenuClick = output<void>();

  emitClick() {
    this.onMenuClick.emit();
  }
}
