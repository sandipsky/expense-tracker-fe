import { Component, inject } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { Table } from '../../shared/components/table/table';
import { SortEvent } from '../../shared/directives/sortable/sortable-header.directive';
import { ICategory } from './category.model';
import { CategoryService } from './category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryModal } from './category-modal/category-modal';
import { FilterData } from '../../shared/types/filter.model';
import { PageResponse } from '../../shared/types/page-response.model';
import { ToastrService } from 'ngx-toastr';
import { DeleteModal } from '../../shared/components/delete-modal/delete-modal';
import { ApiResponse } from '../../shared/types/api-response.model';

@Component({
  selector: 'app-category',
  imports: [Table],
  providers: [CategoryService],
  templateUrl: './category.html',
  styleUrl: './category.scss'
})
export class Category {
  public commonService = inject(CommonService);
  private _categoryService = inject(CategoryService);
  private _dialog = inject(MatDialog);
  private _toastr = inject(ToastrService);
  length: number = 0;
  public sortedData: ICategory[] = [];

  filterData: FilterData = {
    pageIndex: 0,
    pageSize: 25,
    sort: [],
    filter: []
  };

  tableHeaders = [
    { name: 'SN', property: 'sn', sort: false },
    { name: 'Category Name', property: 'name', sort: true, sortBy: 'name' },
    { name: 'Type', property: 'type', sort: true, sortBy: 'type' },
    { name: 'Description', property: 'description', sort: false },
    { name: 'Status', property: 'is_active', sort: true, sortBy: 'is_active', status: true },
  ];

  tableData: ICategory[] = [];

  constructor() { }

  ngOnInit() {
    this.getCategoryList();
  }

  onSort(event: SortEvent) {
    if (event.direction === '' || event.column === '') {
      this.sortedData = this.tableData;
    }
    else {
      this.sortedData = this.commonService.sortList([...this.tableData], event.column, event.direction);
    }
  }


  getCategoryList() {
    this.commonService.showSpinner();
    this._categoryService.getCategorys(this.filterData).subscribe({
      next: (categorys: PageResponse<ICategory[]>) => {
        this.tableData = categorys.content;
        this.sortedData = this.tableData;
        this.commonService.hideSpinner();
      },
      error: (err) => {
        this.commonService.hideSpinner();
      }
    })
  }

  showAddForm() {
    const dialogRef = this._dialog.open(CategoryModal, {
      width: '800px',
      position: { top: '64px' }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data == true) {
        this.getCategoryList();
      }
    })
  }

  editCategory(category: ICategory) {
    const dialogRef = this._dialog.open(CategoryModal, {
      width: '800px',
      position: { top: '64px' },
      data: category
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data == true) {
        this.getCategoryList();
      }
    })
  }

  deleteCategory(category: ICategory) {
    const dialogRef = this._dialog.open(DeleteModal, {
      width: '800px',
      position: { top: '64px' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.commonService.showSpinner();
        this._categoryService.deleteCategory(category.id).subscribe({
          next: (res: ApiResponse) => {
            this.commonService.hideSpinner();
            this._toastr.success(res.message);
            this.getCategoryList();
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
