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
    @Input() border:string = 'none';
    _diameter = 40;
    @Input()
    set diameter(val:any) {
        if(val < 15) this.strokeWidth = 3;
        else if(val < 20) this.strokeWidth = 5;
        this._diameter = val;
    } //spinner 크기
    strokeWidth:number = 10;
    _pie = false;
    @Input()
    set pie(val:any) {
        if(val) {
            this._pie = true;
            this.strokeWidth = (this._diameter - 10)*0.7;
            console.log(this._diameter,this.strokeWidth)
            // this.strokeWidth = this._diameter < 13 ? this._diameter*0.35 :
            //                     this._diameter < 16 ? this._diameter*0.39 :
            //                     this._diameter < 20 ? this._diameter*0.51 :
            //                     this._diameter < 30 ? this._diameter*0.53 :
            //                     this._diameter < 40 ? this._diameter*0.55 :
            //                     this._diameter < 100 ? this._diameter*0.58 :
            //                     this._diameter < 200 ? this._diameter*0.6 : this._diameter*0.61;
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
