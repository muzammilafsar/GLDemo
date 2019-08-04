import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { MatModule } from '../mat/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';



@NgModule({
  declarations: [EditComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    EditComponent
  ],
  entryComponents: [
    EditComponent,
    DeleteDialogComponent
  ]
})
export class DialogModule { }
