import { Component, inject } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { Table } from '../../shared/components/table/table';
import { SortEvent } from '../../shared/directives/sortable/sortable-header.directive';
import { ICategory } from './category.model';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { PageEvent } from '@angular/material/paginator';
import { CategoryService } from './category.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CategoryModal } from './category-modal/category-modal';

@Component({
  selector: 'app-category',
  imports: [Table, PaginatorComponent, HttpClientModule],
  providers: [CategoryService],
  templateUrl: './category.html',
  styleUrl: './category.scss'
})
export class Category {
  public commonService = inject(CommonService);
  private _categoryService = inject(CategoryService);
  private _dialog = inject(MatDialog)

  filterData = {
    pageIndex: 0,
    pageSize: 25,
    length: 0
  }

  tableHeaders = [
    { name: 'SN', property: 'sn', sort: false },
    { name: 'Category Name', property: 'name', sort: false },
    { name: 'Type', property: 'type', sort: true },
    { name: 'Description', property: 'description', sort: true },
    { name: 'Status', property: 'is_active', sort: true, status: true },
  ];

  tableData: ICategory[] = [];

  constructor() { }

  ngOnInit() {
    this.getCategoryList();
  }

  onSort(event: SortEvent) {

  }

  onPageChange(pageData: PageEvent) {

  }


  getCategoryList() {
    this.commonService.showSpinner();
    this._categoryService.getCategorys().subscribe({
      next: (categorys: ICategory[]) => {
        this.tableData = categorys;
        this.commonService.hideSpinner();
      },
      error: (err) => {
        this.commonService.hideSpinner();
      }
    })
  }

  showAddForm() {
    this._dialog.open(CategoryModal, {
      width: '800px',
      position: { top: '64px' }
    });
  }

}
