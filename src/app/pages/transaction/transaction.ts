import { Component, inject } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { Table } from '../../shared/components/table/table';
import { SortEvent } from '../../shared/directives/sortable/sortable-header.directive';
import { ITransaction } from './transaction.model';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { PageEvent } from '@angular/material/paginator';
import { TransactionService } from './transaction.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-transaction',
  imports: [Table, PaginatorComponent, HttpClientModule],
  providers: [TransactionService],
  templateUrl: './transaction.html',
  styleUrl: './transaction.scss'
})
export class Transaction {
  public commonService = inject(CommonService);
  public transactionService = inject(TransactionService);

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
    { name: 'Amount', property: 'amount', sort: true, amount: true, align: 'right' },
    { name: 'User', property: 'user_name', sort: true },
    { name: 'Remarks', property: 'remarks', sort: true },
  ];

  tableData: ITransaction[] = [];

  constructor() { }

  ngOnInit() {
    this.getTransactionList();
  }

  onSort(event: SortEvent) {

  }

  onPageChange(pageData: PageEvent) {

  }


  getTransactionList() {
    this.commonService.showSpinner();
    this.transactionService.getTransactions().subscribe({
      next: (transactions: ITransaction[]) => {
          this.tableData = transactions;
          this.commonService.hideSpinner();
      },
      error: (err) => {
          this.commonService.hideSpinner();
      }
    })
  }

}
