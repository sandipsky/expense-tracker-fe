import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SortableHeaderDirective } from '../../directives/sortable/sortable-header.directive';

@Component({
  selector: 'app-table',
  imports: [MatIconModule, CommonModule, SortableHeaderDirective],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table {
  @Input() tableHeaders: any[] = [];
  @Input() tableData: any[] = [];
  @Input() actions: string[] = ['a'];

  onSort(event: any) {

  }
}
