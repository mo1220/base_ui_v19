import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy, QueryList,
  ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {NotificationService} from "../../core/notifications/notification.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

/**
 * @class StyleGuideButtonComponent *
 * */
@Component({
  selector: 'style-guide-select',
  templateUrl: './Select.template.html',
  encapsulation: ViewEncapsulation.None
})
export class StyleGuideSelectComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentWrap') contentWrap: ElementRef;
  @ViewChildren('anchor') anchors: QueryList<ElementRef>;
  @ViewChildren('multiple') multiple: ElementRef;
  selectMenu: any = [
    {
      title: 'Basic Select',
      anchor: 'basic',
    },
    {
      title: 'Size',
      anchor: 'size',
    },
    {
      title: 'Multiple Select',
      anchor: 'multiple',
    },
    {
      title: 'Multiple Short Label',
      anchor: 'multipleShort',
    },
  ];

  defaultBindingsList = [
    { value: 1, label: 'Vilnius' },
    { value: 2, label: 'Kaunas' },
    { value: 3, label: 'Pavilnys' },
    { value: 4, label: 'Disable', disabled: true }
  ];
  selectedCity:any = null;
  selectedCity2:any = null;

  people:Array<any> = [
    {value:1, label:'kim', group: 'male', selected:false},
    {value:2, label:'lee', group: 'male', selected:false},
    {value:3, label:'jeong', group: 'male', selected:false},
    {value:4, label:'park', group: 'male', selected:false},
    {value:5, label:'woo', group: 'female', selected:false},
    {value:6, label:'lim', group: 'female', selected:false},
    // {value:7, label:'bae', group: 'female', selected:false},
    // {value:8, label:'choi', group: 'female', selected:false}
  ];
  selectedPeople:Array<any> = [];
  chipList = [
    {name: 'Primary', value: 'primary'},
    {name: 'Success', value: 'success'},
    {name: 'Info', value: 'info'},
    {name: 'Warning', value: 'warning'},
    {name: 'Danger', value: 'danger'},
  ];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;



  sizeList = [ // 사이즈별 반복용
    {
      label: 'Xsmall',
      class: 'xs',
      buttonClass: 'btn-xs'
    },
    {
      label: 'Small',
      class: 'sm',
      buttonClass: 'btn-sm'
    },
    {
      label: 'Base',
      class: 'base',
      buttonClass: ''
    },
    {
      label: 'Large',
      class: 'lg',
      buttonClass: 'btn-lg'
    },
  ]

  constructor(
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private router: Router,
    private notiService: NotificationService,
  ) {
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  removeChip(chip: any) {
    const index = this.chipList.indexOf(chip);
    if (index >= 0) {
      this.chipList.splice(index, 1);
    }
  }

  msgBox(msg:string): void {
    this.notiService.info(msg);
  }



  selectAll() {
    this.selectedPeople = this.people.map(x => x.value);
  }

  unselectAll() {
    this.selectedPeople = [];
  }

  ngOnDestroy(): void { }
}
