import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SortableHeaderDirective, SortEvent } from '../../directives/sortable/sortable-header.directive';
import { AmountPipe } from '../../pipes/amount-pipe/amount.pipe';

@Component({
  selector: 'app-table',
  imports: [MatIconModule, CommonModule, SortableHeaderDirective, AmountPipe],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table {
  @Input() tableHeaders: any[] = [];
  @Input() tableData: any[] = [];
  @Input() actions: string[] = ['a'];
  @Output() sortChange = new EventEmitter<SortEvent>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  onSort(event: SortEvent) {
    this.sortChange.emit(event);
  }
}
