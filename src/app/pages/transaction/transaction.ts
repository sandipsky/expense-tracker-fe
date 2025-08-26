import { Component, inject } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { Table } from '../../shared/components/table/table';
import { SortEvent } from '../../shared/directives/sortable/sortable-header.directive';
import { ITransaction } from './transaction.model';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-transaction',
  imports: [Table, PaginatorComponent],
  templateUrl: './transaction.html',
  styleUrl: './transaction.scss'
})
export class Transaction {
  public commonService = inject(CommonService);
  filterData = {
    pageIndex: 0,
    pageSize: 25,
    length: 0
  }

  tableHeaders = [
    { name: 'SN', property: 'sn', sort: false },
    { name: 'Entry No.', property: 'system_entry_no', sort: false },
    { name: 'Date', property: 'date', sort: true },
    { name: 'Category', property: 'category_name', sort: true },
    { name: 'Account', property: 'account_name', sort: true },
    { name: 'Amount', property: 'amount', sort: true, amount: true },
    { name: 'User', property: 'user_name', sort: true, amount: true },
    { name: 'Remarks', property: 'remarks', sort: true },
  ];

  tableData: ITransaction[] = [];

  constructor() {}

  onSort(event: SortEvent) {

  }

  onPageChange(pageData: PageEvent) {
    this.filterData.pageIndex = pageData.pageIndex;
    this.filterData.pageSize = pageData.pageSize;
    this.commonService.showSpinner(true);
    setTimeout(() => this.commonService.showSpinner(false), 500)

  }


  getTransactionList() {

  }

}
