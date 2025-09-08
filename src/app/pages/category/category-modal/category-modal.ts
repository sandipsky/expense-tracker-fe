import { Component, inject } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { CategoryService } from '../category.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../shared/types/api-response.model';
import { InputValidatorDirective } from '../../../shared/directives/input-validator/input-validator.directive';

@Component({
  selector: 'app-category',
  imports: [MatIconModule, MatDialogModule, ReactiveFormsModule, NgSelectModule, InputValidatorDirective],
  providers: [CategoryService],
  templateUrl: './category-modal.html',
  styleUrl: './category-modal.scss'
})
export class CategoryModal {
  public commonService = inject(CommonService);
  private _categoryService = inject(CategoryService);
  private _fb = inject(FormBuilder);
  private _toastr = inject(ToastrService);
  private _dialogRef = inject(MatDialogRef<CategoryModal>);

  modalForm: FormGroup;

  categoryTypes: string[] = ['Expense', 'Income']

  constructor() {
    this.modalForm = this._fb.nonNullable.group({
      id: [],
      name: [, Validators.required],
      color_code: [],
      type: ["Expense", Validators.required],
      description: [],
      is_active: [true, Validators.required]
    })
  }

  ngOnInit() {
  }

  get f() { return this.modalForm.controls; }

  saveForm() {
    this.modalForm.markAllAsTouched();
    if (this.modalForm.invalid) {
      return;
    }

    this.commonService.showSpinner();
    this._categoryService.createCategory(this.modalForm.value).subscribe({
      next: (res: ApiResponse) => {
        this.commonService.hideSpinner();
        this._toastr.success(res.message);
        this._dialogRef.close(true);
      },
      error: (err) => {
        this.commonService.hideSpinner();
        this._toastr.error(err?.error?.message);
      }
    })

  }
}
