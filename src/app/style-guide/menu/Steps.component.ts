import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-steps',
  templateUrl: './Steps.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideStepsComponent implements AfterViewInit, OnDestroy {
  activeIndex: number = 0;
  items: any[] = [
    {
      label: 'Personal',
      txt: 'PersonalPersonalPersonal'
    },
    {
      label: 'Seat',
      txt: 'SeatSeatSeatSeatSeat'
    },
    {
      label: 'Payment',
      txt: 'PaymentPaymentPayment'
    },
    {
      label: 'Confirmation',
      txt: 'ConfirmationConfirmationConfirmation'
    }
  ];

  sizes: number[] = [30, 40, 50, 60, 80, 100];

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router
  ) {
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  ngOnDestroy(): void { }
}
