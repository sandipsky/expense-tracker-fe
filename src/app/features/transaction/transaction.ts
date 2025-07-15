import { Component, inject } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { Table } from '../../shared/components/table/table';
import { data } from './data';

@Component({
  selector: 'app-transaction',
  imports: [Table],
  templateUrl: './transaction.html',
  styleUrl: './transaction.scss'
})
export class Transaction {
  public commonService = inject(CommonService);

  tableHeaders = [
    { name: 'SN', property: 'sn', sort: false },
    { name: 'Name', property: 'name', sort: true },
    { name: 'Date', property: 'date', sort: false },
    { name: 'Amount', property: 'amount', sort: true, amount: true },
  ];

  tableData = data;
}
