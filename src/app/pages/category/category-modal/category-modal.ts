import { Component, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from '../../../shared/services/common.service';
import { CategoryService } from '../category.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  imports: [HttpClientModule, MatIconModule, MatDialogModule, ReactiveFormsModule],
  providers: [CategoryService],
  templateUrl: './category-modal.html',
  styleUrl: './category-modal.scss'
})
export class CategoryModal {
  public commonService = inject(CommonService);
  public categoryService = inject(CategoryService);
  private _fb = inject(FormBuilder)
  modalForm: FormGroup;

  constructor() {
    this.modalForm = this._fb.nonNullable.group({
      id: [],
      name: [Validators.required],
      color_code: [],
      type: [Validators.required],
      description: [],
      is_active: [true, Validators.required]
    })
  }

  ngOnInit() {
  }
}
