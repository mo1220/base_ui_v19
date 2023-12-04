import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'dtk-steps',
  templateUrl: './dtk-steps.template.html',
  styleUrls: ['./dtk-steps.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'w-100',
  }
})
export class DtkStepsComponent implements OnInit, OnDestroy {

  @Input() model:any;
  @Input() size: number = 50;
  @Input() activeIndex:number;
  @Input() clickToChangeIndex: boolean = false;
  @Input() verticalMode: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}

