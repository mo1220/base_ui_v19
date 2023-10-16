import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { NotificationService } from '../notifications/notification.service';
import { TranslateService } from '@ngx-translate/core';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(
    private notificationsService: NotificationService,
    private translate: TranslateService
  ) {
    super();
  }

  // @ts-ignore
  handleError(error: Error | HttpErrorResponse | any) {
    let er:any = error;
    let displayMessage = er.error ? er.error.message : this.translate.instant('errors.err01');

    if (!environment.production) {
      // displayMessage += ' 콘솔 확인.';
      // this.notificationsService.error(displayMessage, error);
    }

    if(error.status > 0) {
      this.notificationsService.error(displayMessage, error);
    }

    // console.log(displayMessage);
    // this.notificationsService.error(error);

    super.handleError(error);
  }
}
