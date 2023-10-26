import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'popup-message',
  templateUrl: './popup-message.template.html',
  styleUrls: ['./popup-message.style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupMessage implements OnInit {
  type = 'info'; // 타입 기본값; 'success' | 'info' | 'warning' | 'error'
  icons: any = {
    info: 'info',
    success: 'task_alt',
    warning: 'warning',
    error: 'cancel'
  }
  constructor(
    public dialogRef: MatDialogRef<PopupMessage>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.type = data.type ? data.type : this.type;
  }

  ngOnInit() {
    this.data.cancelNone = this.data.cancelNone === undefined ? true : this.data.cancelNone;
  }

  onNoClick(): void {
    this.dialogRef.close('close');
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  onSubmit() {
    this.dialogRef.close('confirm');
  }
}
