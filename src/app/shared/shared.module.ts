import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
// Angular Material
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
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
import { OverlayModule } from '@angular/cdk/overlay';

// ngx-bootstrap
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


import { PipesModule } from './pipes/index'; // Pipe
import { RouterModule } from '@angular/router';
import { AsideMenuComponent, AsideMenuItemComponent } from './aside/aside-menu.component'; // Left Menu
import { PopupMessage } from './popup-message/popup-message';
import { CustomToastComponent } from './toast-message/toast-message.component';

// 3rd Party
import { ToastrModule } from 'ngx-toastr';
import { LaddaModule } from 'angular2-ladda';
import { QuillModule } from 'ngx-quill';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorSwatchesModule } from 'ngx-color/swatches';
import { ColorChromeModule } from 'ngx-color/chrome';
import { AceModule } from 'ngx-ace-wrapper';
import { ACE_CONFIG } from 'ngx-ace-wrapper';
import { AceConfigInterface } from 'ngx-ace-wrapper';
import {CategoryColorsComponent} from "./category-colors/category-colors.component";
import {ColorDialog} from "./color-dialog/color-dialog";
import {ColorInputComponent} from "./color-input/color-input.component";
import {ColorsScaleComponent} from "./colors-scale/colors-scale";

const DEFAULT_ACE_CONFIG: AceConfigInterface = {};
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
    ColorSketchModule,
    ColorSwatchesModule,
    ColorChromeModule,
  ],
  declarations: [
    AsideMenuComponent, // Left Menu
    AsideMenuItemComponent, // Left Menu Item
    PopupMessage, // Popup Message
    CustomToastComponent, // Toast 메세지 에러 표시시 Trace ID 표시용 커스터마이징
    CategoryColorsComponent, // 카테고리 컬러
    ColorDialog, // 컬러 다이얼로그
    ColorInputComponent, // 컬러 인풋
    ColorsScaleComponent // 스케일 컬러 인풋
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

    //3rd Party
    LaddaModule,
    ToastrModule,
    QuillModule,
    AceModule,
    ColorSketchModule,
    ColorSwatchesModule,
    ColorChromeModule,
  ],
  providers: [
    { provide: ACE_CONFIG, useValue: DEFAULT_ACE_CONFIG }
  ],
})
export class SharedModule {
  // constructor() {}
}
