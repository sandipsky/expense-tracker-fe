import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SortableHeaderDirective, SortEvent } from '../../directives/sortable/sortable-header.directive';

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
  @Output() sortChange = new EventEmitter<SortEvent>();

  onSort(event: SortEvent) {
    this.sortChange.emit(event);
  }
}
