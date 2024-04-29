import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { StyleGuideComponent } from './component/style-guide.component';
import { StyleGuideRoutingModule } from './style-guide.routing.module';
// Infomation
import { StyleGuideInfomationComponent } from './style-guide-infomation/style-guide-infomation.component';
// Button
import { StyleGuideButtonComponent } from './button/button.component';
import { StyleGuideSpeedDialComponent } from './button/SpeedDial.component';
import { StyleGuideSplitButtonComponent } from './button/SplitButton.component';
// Data
import { StyleGuideDataViewComponent } from './data/DataView.component';
import { StyleGuidePaginatorComponent } from './data/Paginator.component';
import { StyleGuideTableComponent } from './data/table.component';
import { StyleGuideTreeComponent } from './data/Tree.component';
// File
import { StyleGuideUploadComponent } from './file/upload.component';
// Form
import { StyleGuideAutoComplateComponent } from './form/AutoComplete.component';
import { StyleGuideCalendarComponent } from './form/Calendar.component';
import { StyleGuideCheckboxComponent } from './form/Checkbox.component';
import { StyleGuideChipsComponent } from './form/Chips.component';
import { StyleGuideColorPickerComponent } from './form/ColorPicker.component';
import { StyleGuideDropdownComponent } from './form/Dropdown.component';
import { StyleGuideEditorComponent } from './form/Editor.component';
import { StyleGuideInputComponent } from './form/Input.component';
import { StyleGuideKnobComponent } from './form/Knob.component';
import { StyleGuideRadioButtonComponent } from './form/RadioButton.component';
import { StyleGuideRatingComponent } from './form/Rating.component';
import { StyleGuideSelectComponent } from './form/Select.component';
import { StyleGuideSliderComponent } from './form/Slider.component';
import { StyleGuideInputMaskComponent } from './form/InputMask.component';
import { StyleGuideInputNumberComponent } from './form/inputNumber.component';
import { StyleGuideKeyFilterComponent } from './form/KeyFilter.component';

// Menu
import { StyleGuideBreadcrumbComponent } from './menu/Breadcrumb.component';
import { StyleGuideContextMenuComponent } from './menu/ContextMenu.component';
import { StyleGuideGnbComponent } from './menu/gnb.component';
import { StyleGuideLnbComponent } from './menu/lnb.component';
import { StyleGuideMenuComponent } from './menu/Menu.component';
import { StyleGuideStepsComponent } from './menu/Steps.component';
import { StyleGuideTabMenuComponent } from './menu/TabMenu.component';
// Message
import { StyleGuideLetterAvatarComponent } from "./message/LetterAvatar.component";
import { StyleGuideMessagesComponent } from './message/Messages.component';
// Panel
import { StyleGuideAccordionComponent } from './panel/Accordion.component';
import { StyleGuideCardComponent } from './panel/Card.component';
import { StyleGuideDividerComponent } from './panel/Divider.component';
import { StyleGuideSplitterComponent } from './panel/Splitter.component';
// typography
import { StyleGuideTypographyComponent } from './typography/typography.component';
import {AsideMenuRightComponent} from './aside-menu-right/aside-menu-right.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {StyleGuideGridsterComponent} from './panel/Gridster.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {StyleGuideAgGridComponent} from "./data/AgGrid.component";
import {StyleGuideProgressComponent} from "./data/Progress.component";

@NgModule({
  declarations: [
    // 공통
    AsideMenuRightComponent,

    StyleGuideComponent,
    // Infomation
    StyleGuideInfomationComponent,
    // Button
    StyleGuideButtonComponent,
    StyleGuideSpeedDialComponent,
    StyleGuideSplitButtonComponent,
    // Data
    StyleGuideDataViewComponent,
    StyleGuidePaginatorComponent,
    StyleGuideTableComponent,
    StyleGuideAgGridComponent,
    StyleGuideTreeComponent,
    StyleGuideProgressComponent,
    // File
    StyleGuideUploadComponent,
    // Form
    StyleGuideAutoComplateComponent,
    StyleGuideCalendarComponent,
    StyleGuideCheckboxComponent,
    StyleGuideChipsComponent,
    StyleGuideColorPickerComponent,
    StyleGuideDropdownComponent,
    StyleGuideEditorComponent,
    StyleGuideInputComponent,
    StyleGuideKnobComponent,
    StyleGuideRadioButtonComponent,
    StyleGuideRatingComponent,
    StyleGuideSelectComponent,
    StyleGuideSliderComponent,
    StyleGuideInputMaskComponent,
    StyleGuideInputNumberComponent,
    StyleGuideKeyFilterComponent,
    // Menu
    StyleGuideBreadcrumbComponent,
    StyleGuideContextMenuComponent,
    StyleGuideGnbComponent,
    StyleGuideLnbComponent,
    StyleGuideMenuComponent,
    StyleGuideStepsComponent,
    StyleGuideTabMenuComponent,
    // Message
    StyleGuideLetterAvatarComponent,
    StyleGuideMessagesComponent,
    // Panel
    StyleGuideAccordionComponent,
    StyleGuideCardComponent,
    StyleGuideDividerComponent,
    StyleGuideSplitterComponent,
    StyleGuideGridsterComponent,
    // Typography
    StyleGuideTypographyComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        StyleGuideRoutingModule,
        CdkAccordionModule,
    ],
  exports: [],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class StyleGuideModule {}
