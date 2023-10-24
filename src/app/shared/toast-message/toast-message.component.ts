import { Component } from '@angular/core';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';

@Component({
  selector: '[custom-toast-component]',
  styleUrls: [`./toast-message.style.scss`],
  templateUrl: `./toast-message.template.html`,
  preserveWhitespaces: false,
})
export class CustomToastComponent extends Toast {
  // used for demo purposes
  undoString = 'undo';
  clip = false;
  // constructor is only necessary when not using AoT

  constructor(
    // @ts-ignore
    protected toastrService: ToastrService,
    // @ts-ignore
    public toastPackage: ToastPackage,
  ) {
    super(toastrService, toastPackage);
  }

  action(event: Event) {
    event.stopPropagation();
    this.undoString = 'undid';
    return false;
  }

  clipBoardTaceId(event: Event, id: string | any) {
    event.stopPropagation();
    window.navigator.clipboard.writeText(id).then(() => {
      // 복사가 완료
      this.clip = true;
      setTimeout(() => {
        this.clip = false;
      }, 1000);
    });
  }
}
