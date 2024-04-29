import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
// Angular Material
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

// ngx-bootstrap
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RatingModule } from 'ngx-bootstrap/rating';


import { PipesModule } from './pipes/index'; // Pipe
import { RouterModule } from '@angular/router';
import { AsideMenuComponent, AsideMenuItemComponent } from './aside/aside-menu.component'; // Left Menu
import { PopupMessage } from './popup-message/popup-message';
import { CustomToastComponent } from './toast-message/toast-message.component';

// 3rd Party
import { ToastrModule } from 'ngx-toastr';
import { LaddaModule } from 'angular2-ladda';
import { QuillModule } from 'ngx-quill';
import { GridsterModule } from 'angular-gridster2';
import { AceModule } from 'ngx-ace-wrapper';
import { ACE_CONFIG } from 'ngx-ace-wrapper';
import { AceConfigInterface } from 'ngx-ace-wrapper';
const DEFAULT_ACE_CONFIG: AceConfigInterface = {};
import { FileUploadModule } from "ng2-file-upload";

import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorSwatchesModule } from 'ngx-color/swatches';
import { ColorChromeModule } from 'ngx-color/chrome';
import { CategoryColorsComponent} from './category-colors/category-colors.component';
import { ColorDialog } from './color-dialog/color-dialog';
import { ColorInputComponent } from './color-input/color-input.component';
import { ColorsScaleComponent } from './colors-scale/colors-scale';
import { TreeModule } from '@odymaui/angular-tree-component';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { TreeDirComponent } from './tree/tree-dir-component/tree-dir-component';
import { TreeSelectFilterComponent } from './tree/tree-filter/tree-select-filter.component';
import { NgxSkeletonModule } from 'ngx-skeleton';
import { NgxSliderModule } from 'ngx-slider-v2';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResizedEventModule } from './resized-event/angular-resized-event.module';
import { DtkSliderComponent } from './dtk-slider/dtk-slider';
import { DtkMatSliderComponent } from './dtk-mat-slider/dtk-mat-slider';
import { DtkStepsComponent } from "./dtk-steps/dtk-steps.component";
import { AngularDraggableModule } from 'angular2-draggable';
import { DndModule } from 'ngx-drag-drop';

import { GnbComponent, GnbItemComponent } from './gnb/gnb.component'; // Drag 하여 사이즈 변경시 사용

/*** ag-grid ***/
import 'ag-grid-enterprise';
import { AgGridModule } from 'ag-grid-angular';
import { LicenseManager } from 'ag-grid-enterprise';
LicenseManager.setLicenseKey('Using_this_AG_Grid_Enterprise_key_( AG-050551 )_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_( legal@ag-grid.com )___For_help_with_changing_this_key_please_contact_( info@ag-grid.com )___( Datatree Korea )_is_granted_a_( Multiple Applications )_Developer_License_for_( 1 ))_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_need_to_be_licensed_in_addition_to_the_ones_working_with_AG_Grid_Enterprise___This_key_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_AG_Grid_Enterprise_versions_released_before_( 9 November 2024 )____[v2]_MTczMTExMDQwMDAwMA==a0d6611a7276ad730b41535ae0a40371')
import { ModuleRegistry } from 'ag-grid-community';
import { ExcelExportModule } from 'ag-grid-enterprise';
import { DatePickerComponent } from './date-picker/date-picker';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker';
import { KnobComponent } from './knob/knob.component';
import { InputMask } from './input-mask/input-mask.component';
import { InputNumber } from './input-number/input-number.component';
import { KeyFilter } from './key-filter/key-filter';
import { LetterAvatarComponent } from "./letter-avatar/letter-avatar.component";
import {CellLoadingComponent} from "./ag-grid/cell-loading/cell-loading.component";
import {ButtonRenderComponent} from "./ag-grid/button-render.component";
import {ChipRenderComponent} from "./ag-grid/chip-render.component";
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";
import {ProgressSpinnerComponent} from "./progress-spinner/progress-spinner.component";
import {ProgressPieComponent} from "./progress-pie/progress-pie.component";
ModuleRegistry.registerModules([ ExcelExportModule ]);


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,

    // Angular Material
    DragDropModule,
    CdkMenuModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSelectModule,
    // MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatDividerModule,
    MatRippleModule,
    MatRadioModule,
    MatTreeModule,
    MatTableModule,
    MatSortModule,
    MatBadgeModule,
    MatDialogModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    CdkMenuModule,
    OverlayModule,

    // ngx-bootstrap
    BsDatepickerModule,
    PopoverModule,
    PaginationModule,
    TimepickerModule,
    TooltipModule,
    TabsModule,
    CollapseModule,
    ButtonsModule,
    RatingModule,


    PipesModule,
    RouterModule,
    ToastrModule,
    LaddaModule.forRoot({
      style: 'zoom-out',
      spinnerSize: 20,
      spinnerColor: 'white',
      spinnerLines: 36
    }),
    QuillModule.forRoot(),
    AceModule,
    AgGridModule,
    ColorSketchModule,
    ColorSwatchesModule,
    ColorChromeModule,
    ResizedEventModule,
    TreeModule,
    TableVirtualScrollModule,
    TreeModule,
    NgxSkeletonModule,
    NgxSliderModule,
    NgSelectModule,
    AngularDraggableModule,
    GridsterModule,
    DndModule,
    FileUploadModule
  ],
  declarations: [
    CellLoadingComponent,
    ButtonRenderComponent,
    ChipRenderComponent,
    AsideMenuComponent, // Left Menu
    AsideMenuItemComponent, // Left Menu Item
    PopupMessage, // Popup Message
    CustomToastComponent, // Toast 메세지 에러 표시시 Trace ID 표시용 커스터마이징
    CategoryColorsComponent, // 카테고리 컬러
    ColorDialog, // 컬러 다이얼로그
    ColorInputComponent, // 컬러 인풋
    ColorsScaleComponent, // 스케일 컬러 인풋
    DatePickerComponent, // 캘린더 DatePicker
    DateRangePickerComponent,
    LetterAvatarComponent,
    TreeDirComponent, // Tree directory
    TreeSelectFilterComponent, // Tree Filter
    DtkSliderComponent, // Slider Component
    DtkMatSliderComponent, // Slider Material Component
    GnbComponent, // Global Navigation
    GnbItemComponent, // Global Navigation Item
    KnobComponent, // Knob Component
    InputMask, // Input Mask
    InputNumber, // Input Number
    KeyFilter,  // key 입력 필터
    DtkStepsComponent,
    ProgressBarComponent,
    ProgressSpinnerComponent,
    ProgressPieComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,

    DragDropModule,
    CdkMenuModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSelectModule,
    // MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatRadioModule,
    MatTreeModule,
    MatTableModule,
    MatSortModule,
    MatBadgeModule,
    MatDialogModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    OverlayModule,

    // ngx-bootstrap
    BsDatepickerModule,
    PopoverModule,
    PaginationModule,
    TimepickerModule,
    TooltipModule,
    TabsModule,
    CollapseModule,
    ButtonsModule,
    RatingModule,

    PipesModule, // Pipe

    // Shared Component
    AsideMenuComponent,
    AsideMenuItemComponent,
    PopupMessage,
    CustomToastComponent,
    CategoryColorsComponent, // 카테고리 컬러
    ColorDialog, // 컬러 다이얼로그
    ColorInputComponent, // 컬러 인풋
    ColorsScaleComponent, // 스케일 컬러 인풋
    DatePickerComponent, // 캘린더 DatePicker
    DateRangePickerComponent,
    LetterAvatarComponent,
    DtkSliderComponent, // Slider Component
    DtkMatSliderComponent, // Slider Material Component
    TreeDirComponent, // 트리 디렉토리 구조
    TreeSelectFilterComponent, // 트리 필터
    GnbComponent, // Global Navigation
    GnbItemComponent, // Global Navigation Item
    KnobComponent, // Knob Component
    KeyFilter, // key 입력 필터
    InputMask, // Input Mask
    InputNumber, // Input Number
    DtkStepsComponent,
    ProgressBarComponent,
    ProgressSpinnerComponent,
    ProgressPieComponent,

    //3rd Party
    LaddaModule,
    ToastrModule,
    QuillModule,
    AceModule,
    CdkMenuModule,

    AgGridModule,
    CellLoadingComponent,
    ButtonRenderComponent,
    ChipRenderComponent,

    ColorSketchModule,
    ColorSwatchesModule,
    ColorChromeModule,
    ResizedEventModule,
    TreeModule,
    NgxSkeletonModule,
    TableVirtualScrollModule,
    TreeDirComponent, // 트리 디렉토리 구조
    TreeSelectFilterComponent, // 트리 필터
    NgxSliderModule, // Slider Module
    NgSelectModule,
    AngularDraggableModule, // Element Resize 모듈
    GridsterModule, // Angular Gridster2
    DndModule,
    FileUploadModule
  ],
  providers: [
    { provide: ACE_CONFIG, useValue: DEFAULT_ACE_CONFIG }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule {
  // constructor() {}
}
