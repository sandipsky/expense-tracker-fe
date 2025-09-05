import { Component, inject } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { Table } from '../../shared/components/table/table';
import { SortEvent } from '../../shared/directives/sortable/sortable-header.directive';
import { ICategory } from './category.model';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { PageEvent } from '@angular/material/paginator';
import { CategoryService } from './category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryModal } from './category-modal/category-modal';
import { FilterData } from '../../shared/types/filter.model';
import { PageResponse } from '../../shared/types/page-response.model';

@Component({
  selector: 'app-category',
  imports: [Table, PaginatorComponent],
  providers: [CategoryService],
  templateUrl: './category.html',
  styleUrl: './category.scss'
})
export class Category {
  public commonService = inject(CommonService);
  private _categoryService = inject(CategoryService);
  private _dialog = inject(MatDialog);
  length: number = 0;

  filterData: FilterData = {
    pageIndex: 0,
    pageSize: 25,
    sort: [],
    filter: []
  }

  tableHeaders = [
    { name: 'SN', property: 'sn', sort: false },
    { name: 'Category Name', property: 'name', sort: true, sortBy: 'name' },
    { name: 'Type', property: 'type', sort: true, sortBy: 'type' },
    { name: 'Description', property: 'description', sort: false },
    { name: 'Status', property: 'is_active', sort: true, sortBy: 'isActive', status: true },
  ];

  tableData: ICategory[] = [];

  constructor() { }

  ngOnInit() {
    this.getCategoryList();
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
    this.getCategoryList();
  }

  onPageChange(pageData: PageEvent) {

  }


  getCategoryList() {
    this.commonService.showSpinner();
    this._categoryService.getCategorys(this.filterData).subscribe({
      next: (categorys: PageResponse<ICategory[]>) => {
        this.tableData = categorys.content;
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
