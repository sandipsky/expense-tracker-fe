import { Component, inject } from '@angular/core';
import { CommonService } from '../../../shared/services/common.service';
import { TransactionService } from '../transaction.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../shared/types/api-response.model';
import { InputValidatorDirective } from '../../../shared/directives/input-validator/input-validator.directive';
import { DropdownItem } from '../../../shared/types/dropdown';
import { DropdownService } from '../../../shared/services/dropdown.service';

@Component({
  selector: 'app-transaction',
  imports: [MatIconModule, MatDialogModule, ReactiveFormsModule, NgSelectModule, InputValidatorDirective],
  providers: [TransactionService],
  templateUrl: './transaction-modal.html'
})
export class TransactionModal {
  public commonService = inject(CommonService);
  private _transactionService = inject(TransactionService);
  private _dropdownService = inject(DropdownService);
  private _fb = inject(FormBuilder);
  private _toastr = inject(ToastrService);
  private _dialogRef = inject(MatDialogRef<TransactionModal>);
  public categoryList: DropdownItem[] = [];
  public accountList: DropdownItem[] = [];

  modalForm: FormGroup;

  transactionTypes: string[] = ['Expense', 'Income']

  constructor() {
    this.modalForm = this._fb.nonNullable.group({
      id: [],
      date: [, Validators.required],
      system_entry_no: [],
      amount: [0, Validators.required],
      remarks: [],
      category_id: [, Validators.required],
      user_id: [],
      account_id: [, Validators.required]
    });
  }

  ngOnInit() {
    this.getCategoryDropdownList();
    this.getAccountDropdownList();
  }

  get f() { return this.modalForm.controls; }

  getCategoryDropdownList() {
    this._dropdownService.getCategoryDropdown().subscribe({
      next: (items: DropdownItem[]) => {
        this.categoryList = items;
      }
    })
  }

  getAccountDropdownList() {
    this._dropdownService.getAccountsDropdown().subscribe({
      next: (items: DropdownItem[]) => {
        this.accountList = items;
      }
    })
  }

  saveForm() {
    this.modalForm.markAllAsTouched();
    if (this.modalForm.invalid) {
      return;
    }

    this.commonService.showSpinner();
    const formData = this.modalForm.value;
    const request$ = formData.id
      ? this._transactionService.updateTransaction(formData.id, formData)
      : this._transactionService.createTransaction(formData);

    request$.subscribe({
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
