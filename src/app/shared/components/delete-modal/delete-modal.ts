import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-delete',
  imports: [MatIconModule, MatDialogModule, NgSelectModule],
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.scss'
})
export class DeleteModal {

  private _dialogRef = inject(MatDialogRef<DeleteModal>);

  deleteItem() {
    this._dialogRef.close(true);
  }
}
