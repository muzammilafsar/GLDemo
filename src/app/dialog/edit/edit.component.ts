import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  email: string;
  emailForm: FormGroup;
  newForm: boolean = false;
  constructor(public dialogRef: MatDialogRef<EditComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    console.log(data);
    this.email = data.email || '';
    this.newForm = data.newForm;
  }
  onNoClick() {
    if(true) {
      this.emailForm.valid ?
      this.dialogRef.close(this.emailForm) : '';
    } else {
      this.dialogRef.close();
    }
  }
  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl(this.email, Validators.email),
    }) 
  }

}
