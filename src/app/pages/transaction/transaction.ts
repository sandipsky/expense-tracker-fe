import { Component, inject } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { Table } from '../../shared/components/table/table';
import { SortEvent } from '../../shared/directives/sortable/sortable-header.directive';
import { ITransaction } from './transaction.model';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { PageEvent } from '@angular/material/paginator';
import { TransactionService } from './transaction.service';
import { PageResponse } from '../../shared/types/page-response.model';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../shared/types/api-response.model';
import { TransactionModal } from './transaction-modal/transaction-modal';
import { MatDialog } from '@angular/material/dialog';
import { FilterData } from '../../shared/types/filter.model';
import { DeleteModal } from '../../shared/components/delete-modal/delete-modal';

@Component({
  selector: 'app-transaction',
  imports: [Table, PaginatorComponent],
  providers: [TransactionService],
  templateUrl: './transaction.html',
  styleUrl: './transaction.scss'
})
export class Transaction {
  public commonService = inject(CommonService);
  private _transactionService = inject(TransactionService);
  private _dialog = inject(MatDialog);
  private _toastr = inject(ToastrService);
  public length: number = 0;

  filterData: FilterData = {
    pageIndex: 0,
    pageSize: 25,
    sort: [],
    filter: []
  }

  tableHeaders = [
    { name: 'SN', property: 'sn', sort: false },
    { name: 'Entry No.', property: 'system_entry_no', sort: false },
    { name: 'Date', property: 'date', sort: true },
    { name: 'Transaction', property: 'category_name', sort: true },
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
    const existing = this.filterData.sort.find((item: any) => item.field === event.column);
    if (existing) {
      existing.value = event.direction;
    } else {
      this.filterData.sort.push({
        field: event.column,
        value: event.direction
      });
    }
    this.filterData.sort = this.filterData.sort.filter((item: any) => item.value);
    this.getTransactionList();
  }

  onPageChange(pageData: PageEvent) {
    this.filterData.pageIndex = pageData.pageIndex;
    this.filterData.pageSize = pageData.pageSize;
    this.getTransactionList();
  }

  

  getTransactionList() {
    this.commonService.showSpinner();
    this._transactionService.getTransactions(this.filterData).subscribe({
      next: (transactions: PageResponse<ITransaction[]>) => {
        this.tableData = transactions.content;
        this.length = transactions.totalElements;
        this.commonService.hideSpinner();
      },
      error: (err) => {
        this.commonService.hideSpinner();
      }
    })
  }

  showAddForm() {
    const dialogRef = this._dialog.open(TransactionModal, {
      width: '800px',
      position: { top: '64px' }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data == true) {
        this.getTransactionList();
      }
    })
  }

  editTransaction(transaction: ITransaction) {
    const dialogRef = this._dialog.open(TransactionModal, {
      width: '800px',
      position: { top: '64px' },
      data: transaction
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data == true) {
        this.getTransactionList();
      }
    })
  }

  deleteTransaction(transaction: ITransaction) {
    const dialogRef = this._dialog.open(DeleteModal, {
      width: '800px',
      position: { top: '64px' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.commonService.showSpinner();
        this._transactionService.deleteTransaction(transaction.id).subscribe({
          next: (res: ApiResponse) => {
            this.commonService.hideSpinner();
            this._toastr.success(res.message);
            this.getTransactionList();
          },
          error: (err) => {
            this.commonService.hideSpinner();
            this._toastr.error(err?.error?.message);
          }
        })
      }
    })
  }

}
