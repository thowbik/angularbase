import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  helpDetail: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<HelpComponent>,) {
    if (this.data) {
      this.helpDetail = this.data.helpDetails;
    }
  }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close();
  }

}
