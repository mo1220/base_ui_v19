import {
    AfterViewInit,
    Component, ElementRef,
    OnDestroy, OnInit,
    QueryList,
    ViewChild,
    ChangeDetectorRef,
    ViewChildren,
    ViewEncapsulation, Input
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import {ProgressBarMode} from "@angular/material/progress-bar";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
    selector: 'progress-spinner',
    templateUrl: './progress-spinner.template.html',
    styleUrls: ['./progress-spinner.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProgressSpinnerComponent implements AfterViewInit, OnDestroy, OnInit {
    @Input() mode: ProgressSpinnerMode  = 'determinate'; //'determinate' | 'indeterminate';
    @Input() color: string  = 'primary';
    @Input() value: number  = 0; //퍼센트
    @Input() diameter: number  = 40; //spinner 크기
    strokeWidth:number = 10;
    _pie = false;
    @Input()
    set pie(val:any) {
        if(val) {
            this._pie = true;
            this.strokeWidth = this.diameter < 40 ? this.diameter*0.56 :
                                this.diameter < 200 ? this.diameter*0.6 : this.diameter*0.61;
        }
    };



    constructor(
        private cd: ChangeDetectorRef,
        private translate: TranslateService,
        private elem: ElementRef,
        private router: Router
    ) { }
    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        if(!!this.color){
            const element = this.elem.nativeElement;
            const circle = element.querySelector("circle");
            circle.style.stroke = this.color;
        }
    }


    ngOnDestroy(): void { }

}
