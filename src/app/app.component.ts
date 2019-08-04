import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectFeatureCount } from 'src/actions/list.action';
import { ApiService } from './api.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditComponent } from './dialog/edit/edit.component';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  list$: Observable<any>;
  loader$: Observable<any>;
  emailForm: FormGroup;
  displayedColumns: string[] = ['idtableEmail', 'tableEmailEmailAddress', 'Actions'];
  constructor(private store: Store<any>, public api: ApiService, public dialog: MatDialog) {
    this.list$ = store.pipe(select(selectFeatureCount));
    this.loader$ = this.api.loader$;

  }
  // open dialoag for new email creation  and handles click
  openNewEmailDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      email: '',
      newForm: true
    };

    const dialogRef = this.dialog.open(EditComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.emailForm = result;
        this.api.addEmail({tableEmailEmailAddress: result.value.email,tableEmailValidate: result.valid });
      }
    });
  }
  // open dialoag for edit email and handles click
  openDialog(data): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      email: data.tableEmailEmailAddress,
    };
    const dialogRef = this.dialog.open(EditComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.emailForm = result;
      this.api.updateEmail(data.idtableEmail, {tableEmailEmailAddress: result.value.email,tableEmailValidate: result.valid })
    });
  }
  // open dialoag for email email and handles click
  openDeleteDialog(data): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      email: data.tableEmailEmailAddress,
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result !== false) {
        this.api.deleteEmail(data.idtableEmail);
      }
    });
  }
  ngOnInit(): void {
    this.api.getList();
  }
}
