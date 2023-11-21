import {
  Directive,
  ElementRef,
  HostListener,
  DoCheck,
  Optional,
  ChangeDetectorRef,
  AfterViewInit,
  Input, TemplateRef
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[inputText]'
  // host: {
  //   class: 'p-inputtext p-component p-element',
  //   '[class.p-filled]': 'filled'
  // }
})
export class InputText implements DoCheck, AfterViewInit {
  filled: boolean;

  constructor(public el: ElementRef, @Optional() public ngModel: NgModel, private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.updateFilledState();
    this.cd.detectChanges();
  }

  ngDoCheck() {
    this.updateFilledState();
  }

  @HostListener('input', ['$event'])
  onInput() {
    this.updateFilledState();
  }

  updateFilledState() {
    this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
  }
}


@Directive({
  selector: '[template]',
  host: {}
})
export class DtkTemplate {
  @Input() type: string | undefined;
  @Input('pTemplate') name: string | undefined;
  constructor(public template: TemplateRef<any>) {}
  getType(): string {
    return this.name!;
  }
}
