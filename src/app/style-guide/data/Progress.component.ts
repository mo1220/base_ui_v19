import {
    AfterViewInit,
    Component, ElementRef,
    OnDestroy, OnInit,
    QueryList,
    ViewChild,
    ChangeDetectorRef,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {menuType} from "../style-guide.models";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import * as _ from 'lodash';
/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
    selector: 'style-guide-progress',
    templateUrl: './Progress.template.html',
    encapsulation: ViewEncapsulation.None
})
export class StyleGuideProgressComponent implements AfterViewInit, OnDestroy, OnInit {
    menus: Array<menuType> = [
        {
            title: 'Progress',
            desc: 'pie 모양의 spinner 사용 시 progress-pie 사용',
            anchor: 'progress'
        },
        {
            title: 'loading',
            desc: '기본 로딩',
            anchor: 'loading'
        },
    ];
    progress = 40;

    @ViewChildren('anchors') anchors: QueryList<ElementRef>;

    constructor(
        private cd: ChangeDetectorRef,
        private translate: TranslateService,
        private router: Router
    ) { }
    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.cd.detectChanges();
    }

    changeValue(e:any) {

    }

    ngOnDestroy(): void { }

}
