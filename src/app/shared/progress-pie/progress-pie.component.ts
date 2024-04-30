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
    selector: 'progress-pie',
    templateUrl: './progress-pie.template.html',
    styleUrls: ['./progress-pie.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProgressPieComponent implements AfterViewInit, OnDestroy, OnInit {
    @Input() size: number  = 40; // 전체 가로세로 크기
    @Input() radius: number  = 100; // circle.r
    stroke_width = 200;
    @Input()
    set strokeWidth(value:any) {
        if(value === 'pie') { // 파이 형태로 할 경우 strokeWidth 는 r의 2배
            this.stroke_width = this.radius * 2;
        }else {
            this.stroke_width = value;
        }
    }
    @Input() color: string  = '#E83E8CFF';
    @Input() value: number  = 10;
    @Input() border: string;



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
