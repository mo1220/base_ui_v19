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
/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
    selector: 'progress-bar',
    templateUrl: './progress-bar.template.html',
    styleUrls: ['./progress-bar.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProgressBarComponent implements AfterViewInit, OnDestroy, OnInit {

    @Input() height: number = 4; //progress bar Height(px)
    @Input() borderRadius: number = 0; //progress bar Height(px)
    @Input() mode: ProgressBarMode  = 'determinate'; //'determinate' | 'indeterminate' | 'buffer' | 'query'
    @Input() color: string  = 'primary';
    @Input() value: number  = 0; //퍼센트
    @Input() bufferValue: number  = 0;



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
