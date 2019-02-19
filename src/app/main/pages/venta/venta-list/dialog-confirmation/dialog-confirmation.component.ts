import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'ms-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogConfirmationComponent>) { }

  ngOnInit() {
  }

}
