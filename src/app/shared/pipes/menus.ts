import {Pipe, PipeTransform} from '@angular/core';
import * as numeral from 'numeral';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as chroma from 'chroma-js';
import * as d3 from 'd3';

@Pipe({ name: 'mnp' })
export class MenusPipe implements PipeTransform {
  transform(value: any, args: any): any {
    return Array.from(value);
  }
}
@Pipe({ name: 'splitTraceId' })
export class SplitTraceIdPipe implements PipeTransform {
  transform(value: any): Array<any> {
    return value.split('<br />traceId');
  }
}

@Pipe({ name: 'groupDepth' })
export class groupDepthPipe implements PipeTransform {
  transform(value: any, args: any): Array<any> {
    return _.filter(value, d => d.up_group_id === args);
  }
}

@Pipe({ name: 'findField' })
export class FindFieldPipe implements PipeTransform {
  transform(value: any, args: { fields: any[], returnKey?: string }): string {
    const key = args.returnKey ? args.returnKey : 'name';
    const val = _.find(args.fields, d => d.real_name === value);
    return val ? val[key] : '';
  }
}


@Pipe({ name: 'textCamelCase' })
export class TextCamelCasePipe implements PipeTransform {
  transform(value: any): Array<any> {
    return value.replace(/_/gi, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, function(str: string){ return str.toUpperCase(); });
  }
}

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value: any): Array<{ key: any; value: any, active:boolean }> {
    const keys = [];
    // tslint:disable-next-line:forin
    for (const key in value) {
      // @ts-ignore
      keys.push({ key, value: value[key], active: false });
    }
    return keys;
  }
}

// 한국 시간 명
@Pipe({ name: 'dateKoreaForm' })
export class DateKoreaForm implements PipeTransform {
  transform(val: any): any {
    const value = moment(val).format('YYYY-MM-DD').split('-');
    return `${value[0]}년 ${value[1]}월 ${value[2]}일`;
  }
}

@Pipe({ name: 'fieldFilter' })
export class FieldFilterPipe implements PipeTransform {
  transform(value: any, args: string): any {
    return _.filter(value, d => d[args]);
  }
}

/**
* @pipe FindTypePipe 전체 항목에서 이름기준에 타입을 리턴한다.
* */
@Pipe({ name: 'findType' })
export class FindTypePipe implements PipeTransform {
  transform(value: any, args?: any[]): string {
    const fc = _.find(args, d => d.name === value);
    return fc ? fc.type : '';
  }
}


/*
* 데이터 타입 비교
* */
@Pipe({ name: 'comparisonType' })
export class ComparisonTypePipe implements PipeTransform {
  transform(value: any, args: string): any {
    let val = 'Number';
    if (args.toLowerCase().indexOf('date') !== -1) { // date
      val = 'Date';
    } else if (args.toLowerCase().indexOf('string') !== -1) { // string
      val = 'String';
    }
    return value.toLowerCase() === val.toLowerCase();
  }
}


@Pipe({ name: 'filterLength' })
export class FilterLengthPipe implements PipeTransform {
  transform(value: any[], args: string): any {
    return _.filter(value, d => d[args]).length;
  }
}


/**
* @Pipe DuplicationNamePipe 중복이름 비교
* @param value: 값, args { list: 비교 대상 리스트, key: 리스트 키 }
* */
@Pipe({ name: 'duplicationName' })
export class DuplicationNamePipe implements PipeTransform {
  transform(value:string, args: { list: any[]; key: string; real_name?: string; index?: number; init?:boolean }): boolean {
    if(args.init) return false;
    if(value.trim() == '') return true;
    const list = args.real_name ? _.filter(_.clone(args.list), d => d.real_name !== args.real_name) : _.clone(args.list);
    if(args.index !== undefined) list.splice(args.index , 1);
    const fn = _.find(list, d => d[args.key].toLowerCase() === value.toLowerCase());
    return fn !== undefined;
  }
}

/**
 * @Pipe DuplicationNamePipe 중복이름 비교
 * @param value: 값, args { list: 비교 대상 리스트, key: 리스트 키 }
 * @return
 * */
@Pipe({ name: 'duplicationFieldName' })
export class DuplicationFieldNamePipe implements PipeTransform {
  transform(value:any, args: any[]): boolean {
    if(value.name.trim() == '') return true; // 이름이 없을때도 에러
    if(!value.selected) return false; // 본인이 활성화 안돼었을때 제외
    const list = _.clone(_.filter(args, d => d.selected));
    const curIndex = _.findIndex(list, d => _.isEqual(d, value));
    list.splice(curIndex, 1);
    const fn = _.find(list, d => d.name.toLowerCase() === value.name.toLowerCase());
    return fn !== undefined;
  }
}



@Pipe({ name: 'countTime' })
export class CountTimePipe implements PipeTransform {
  transform(value:number): string {
    const hour = numeral(value/3600).format('00');
    const min = numeral(Math.floor((value%3600)/60)).format('00');
    const sec = numeral(value%60).format('00');
    // const hour = value/3600 < 10 ? '0' + value/3600 : value/3600;
    // const min = (value%3600)/60 < 10 ? '0'+ (value%3600)/60 : (value%3600)/60;
    // const sec = value % 60 < 10 ? '0'+value % 60 : value % 60;
    return `${hour}:${min}:${sec}`;
  }
}

@Pipe({ name: 'indexColor' })
export class indexColorPipe implements PipeTransform {
  transform(value:string[], ags: number): string {
    const index = ags % value.length;
    return value[index];
  }
}


@Pipe({ name: 'iconName' })
export class IconNamePipe implements PipeTransform {
  transform(value:string): string {
    const val = value.split(' ');
    let res = '';
    if(val.length > 1) {
      res = val[0].substr(0, 1).toUpperCase() + val[1].substr(0, 1).toUpperCase();
    } else {
      res = value.substr(0, 2);
    }
    return res;
  }
}

@Pipe({ name: 'filterTypeOperator' })
export class FilterTypeOperatorPipe implements PipeTransform {
  transform(value: any, args: string): any {
    let options = [ ..._.filter(value, d => d.type !== 'string') ]; // Number
    // if (args.toLowerCase().indexOf('date') !== -1) { // date
    //   options = [ ..._.filter(value, d => d.type !== 'string') ];
    // } else
    if (args.toLowerCase().indexOf('string') !== -1) { // string
      options = [ ..._.filter(value, d => d.type !== 'number') ];
    }
    return options;
  }
}

/**
*  @pipe timeDisabled 시작 종료 일시가 같을때 min, max 시간 처리
* */
@Pipe({ name: 'timeDisabled' })
export class timeDisabledPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const {sameDate, time, key, range} = args;
    let val = _.clone(value);
    if(sameDate) {
      if(range === 'to') {
        if(key === 'second') {
          val = _.filter(val, d => time[key] < d);
        }else {
          val = _.filter(val, d => time[key] <= d);
        }

      } else { // range : from
        if(key === 'second') {
          val = _.filter(val, d => time[key] > d);
        }else {
          val = _.filter(val, d => time[key] >= d);
        }

      }
    }
    return val;
  }
}



/* 보고서 예약 상태 Pipe */
@Pipe({ name: 'scheduleInterval' })
export class ScheduleIntervalPipe implements PipeTransform {
  transform(value: any): any {
    const o = value;
    // 초기화
    let week = o['intv_weekday'];
    let day = o['intv_day'];
    let hour = o['intv_hour'];
    let min = o['intv_min'];
    // 변환
    switch(week) {
      case -1 : week = '매주';   break;
      case 0 :  week = '일요일'; break;
      case 1 :  week = '월요일'; break;
      case 2 :  week = '화요일'; break;
      case 3 :  week = '수요일'; break;
      case 4 :  week = '목요일'; break;
      case 5 :  week = '금요일'; break;
      case 6 :  week = '토요일'; break;
    }
    switch(day) {
      case -1  : day = '매일'; break;
      default : day += '일';
    }
    switch(hour) {
      case -1 : hour = '매시';    break;
      default : hour = (hour < 9) ? ('0' + hour) : ('' + hour);    //hour += '시';
    }
    switch(min) {
      case -1 : min = '매분';    break;
      default : min = (min < 9) ? ('0' + min) : ('' + min);     //min += '분';
    }
    // 통합
    let cycle;
    if( day != '매일' ) cycle = '매월';
    else if( week != '매주' ) cycle = '매주';
    else cycle = '매일';
    let time;
    switch( cycle ) {
      case '매월' :
        time = day + ', ' + hour + ':' + min;
        break;
      case '매주' :
        time = week + ', ' + hour + ':' + min;
        break;
      case '매일' :
        time = day +  ', ' + hour + ':' + min;
        break;
    }
    return time;
  }
}


@Pipe({ name: 'fieldType' })
export class FieldTypePipe implements PipeTransform {
  transform(value: any, args: string): any {
    let options = []; // Number
    if (args.toLowerCase().indexOf('date') !== -1) { // date
      // @ts-ignore
      options = _.filter(value, d => d.type.toLowerCase().indexOf('date') !== -1);
    } else if (args.toLowerCase().indexOf('string') !== -1) { // string
      // @ts-ignore
      options = _.filter(value, d => d.type.toLowerCase().indexOf('string') !== -1);
    } else {
      // @ts-ignore
      options = _.filter(value, d => d.type.toLowerCase().indexOf('date') === -1 && d.type.toLowerCase().indexOf('string') === -1);
    }
    return options;
  }
}

/*@Pipe({ name: 'compareField' })
export class CompareFieldPipe implements PipeTransform {
  transform(value, args?: any): any {
    let re_val = [];
    re_val = _.filter(value, d => d.name)
    return re_val
  }
}*/

@Pipe({ name: 'setTime' })
export class SetTimePipe implements PipeTransform {
  transform(value: any): any {
    return numeral(value).format('00');
  }
}


@Pipe({ name: 'typeOperator' })
export class TypeOperatorPipe implements PipeTransform {
  transform(value: any, args: string): any {
    let options = value.number; // Number
    if (args.toLowerCase().indexOf('date') !== -1) { // date
      options = value.datetime;
    } else if (args.toLowerCase().indexOf('string') !== -1) { // string
      options = value.string;
    }
    return options;
  }
}


@Pipe({ name: 'checkXYZGroup' })
export class CheckXYZGroupPipe implements PipeTransform {
  transform(value: any, args: string): any {
    let val = false;
  //  console.log(value, args);
    if(value) {
      const dt = [
        ...value.x,
        ...value.y,
        ...value.z,
        ...value.groups.group
      ];
      val = dt.some( d => d.name === args);
    }
    return val;
  }
}

@Pipe({ name: 'typeOperatorFilter' })
export class TypeOperatorFilterPipe implements PipeTransform {
  transform(value: any, args?: string | undefined): any {
    let operators = _.filter(value, d => d.group === 'number' || d.group === 'all'); // Number
    if (args?.toLowerCase().indexOf('date') !== -1) { // date
      operators = _.filter(value, d => d.group === 'date' || d.group === 'all');
    } else if (args.toLowerCase().indexOf('string') !== -1) { // string
      operators = _.filter(value, d => d.group === 'string' || d.group === 'all');
    }
    return operators;
  }
}

@Pipe({ name: 'typeOperatorstateFilter' })
export class TypeOperatorStateFilterPipe implements PipeTransform {
  transform(value: any, args: string): any {
   // console.log(value, 'state' ,args)
    let operators = _.filter(value, d => d.group === 'number' || d.group === 'all'); // Number
    if (args.toLowerCase().indexOf('string') !== -1) { // date || string (state component)
      operators = _.filter(value, d => ['count','distinct','equal_count'].indexOf(d.type) !== -1)
    } else if( args.toLowerCase().indexOf('date') !== -1){
      operators = _.filter(value, d => ['count','distinct'].indexOf(d.type) !== -1)
    }
    return operators;
  }
}

@Pipe({ name: 'filterOp' })
export class filterOpPipe implements PipeTransform {
  transform(value: any, args?: string): any {
    return args === 'operate' ? _.filter(value, d => d.type.toLowerCase().indexOf('date') === -1 && d.type.toLowerCase().indexOf('string') === -1) : value; // Number;
  }
}

@Pipe({ name: 'operatorName' })
export class OperatorNamePipe implements PipeTransform {
  transform(value: any, args: { type: string; key: string;}): any {
    let options = value.number; // Number
    if (args.type.toLowerCase().indexOf('date') !== -1) { // date
      options = value.datetime;
    } else if (args.type.toLowerCase().indexOf('string') !== -1) { // string
      options = value.string;
    }
    const name = _.find(options, d => d.type === args.key);
    return name ? name.name : '';
  }
}


@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {
  units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  transform(bytes: any = 0, precision: any = 2): string {
    if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
      return '?';
    }
    let unit = 0;
    while (bytes >= 1024) {
      bytes /= 1024;
      unit++;
    }
    return bytes.toFixed(+precision) + ' ' + this.units[unit];
  }
}
@Pipe({ name: 'thousand' })
export class ThousandPipe implements PipeTransform {
  transform(val: any, args?: any): any {
    const suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];
    if (Number.isNaN(val)) {
      return null;
    }
    if (val < 1000) {
      return val;
    }
    const exp = Math.floor(Math.log(val) / Math.log(1000));
    return (val / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
  }
}

@Pipe({ name: 'category' })
export class CategoryPipe implements PipeTransform {
  transform(val: any, args?: any): any {
    const fnVal = _.find(val, d => d.key === args);
    return fnVal ? fnVal.children : [];
  }
}

@Pipe({ name: 'extension' })
export class ExtensionPipe implements PipeTransform {
  transform(value: any): any {
    const valArr = value.split('.');
    return valArr[valArr.length - 1].toUpperCase();
  }
}

@Pipe({ name: 'reform' })
export class ReformPipe implements PipeTransform {
  transform(value: any): any {
    const val = value.replace(/-/g, '.');
    return val;
  }
}

@Pipe({ name: 'br' })
export class BrPipe implements PipeTransform {
  transform(value: any): any {
    // console.log(value);
    if ( !value ) {
      value = '';
    }
    const val = value.replace(/\n/g, '<br />');
    return val;
  }
}

@Pipe({ name: 'fieldList' })
export class FieldListPipe implements PipeTransform {
  transform(value: any): any {
    const x = value.x.map((d:any) => {
      return {
        label: d.description,
        name: d.name,
        type: d.type
      }
    });
    const y = value.y.map((d: any) => {
      return {
        label: d.description,
        name: d.name,
        type: d.type
      }
    });
    const z = value.z.map((d: any) => {
      return {
        label: d.description,
        name: d.name,
        type: d.type
      }
    })
    const val = [ ...x, ...y, ...z, ...value.groups.group ];
    return val;
  }
}

@Pipe({ name: 'scaleColor' })
export class ScaleColor implements PipeTransform {
  transform(value: number, args: { min: {color: string, value: number}, max: {color: string, value: number} }): string {
    const scale = chroma.scale([args.min.color, args.max.color]);
    const percent = (value - args.min.value) / (args.max.value - args.min.value);
    return scale(percent).hex();
  }
}

@Pipe({name: 'tableheader'})
export class TableHeadersPipe implements PipeTransform {
  transform(val: any, args?: any): any {
    const value = _.map(val, d => {
      return `${d.name} (${d.type})`
    })
    return value;
  }
}
// 데이터 테이블 타입을 아이콘으로 변경 , args?: any
@Pipe({name: 'typeIcon'})
export class TypeIconPipe implements PipeTransform {
  transform(val: string): any {
    const icon: any = {
      excel: 'save',
      dbms: 'storage',
      custom: 'build',
      url: 'wysiwyg',
      crawling: 'web'
    }
    const value = icon[val.toLocaleLowerCase()];
    return value;
  }
}

@Pipe({name: 'getType'})
export class GetTypePipe implements PipeTransform {
  // @ts-ignore
  transform(value: any, ...args): string {
    let gb = 'number';
    if (value.toLowerCase().indexOf('date') !== -1) { // date
      // gb = 'datetime';
      gb = 'date';
    } else if (value.toLowerCase().indexOf('string') !== -1) {
      gb = 'string';
    }
    return gb;
  }
}

@Pipe({name: 'usedLength'})
export class UsedLengthPipe implements PipeTransform {
  transform(value: any[]): number {
    return _.filter(value, d => d.used).length;
  }
}

// 데이터 타입을 아이콘으로 변경 , args?: any
@Pipe({name: 'dataTypeIcon'})
export class DataTypeIconPipe implements PipeTransform {
  transform(val: string): any {
    let typeIcon = 'fa-hashtag'; // number
    if(val.toLowerCase().indexOf('date') !== -1) { // date
      typeIcon = 'fa-calendar-o';
    } else if (val.toLowerCase().indexOf('string') !== -1) { // string
      typeIcon = 'fa-text-field';
      if (val.toLowerCase().indexOf('location') !== -1) { // 지역코드 type
        typeIcon = 'fa-map-marker';
      } else if (val.toLowerCase().indexOf('zip_code') !== -1) { // 우편번호 type
        typeIcon = 'fa-location-arrow';
      }
    } else if (val.toLowerCase().indexOf('ip') !== -1) { // IP type
      typeIcon = 'fa-text-field';
    } else if (val.toLowerCase().indexOf('lat_lon') !== -1) { // 위도/경도 type
      typeIcon = 'fa-flag-o';
    } else if (val.toLowerCase().indexOf('boolean') !== -1) { // 위도/경도 type
      typeIcon = 'fa-check-square-o';
    } else if (val.toLowerCase().indexOf('function') !== -1) { // 함수
      typeIcon = 'fa-function';
    }
    if(val === 'json') typeIcon = 'fa-json';
    return typeIcon;
  }
}

@Pipe({name: 'pushIndex'})
export class PushIndexPipe implements PipeTransform {
  transform(val: Array<any>, args:any): any {
    const value = [ ...val, args ];
    return value;
  }
}

@Pipe({name: 'menuActive'})
export class MenuActivePipe implements PipeTransform {
  transform(val: number[], args: { arr: number[]; cur: number }): boolean {
    const mn = [...args.arr, args.cur];
    const _mn = val.slice(0 , mn.length);
    return _.isEqual(mn, _mn);
  }
}


@Pipe({name: 'datasetFilter'})
export class DatasetFilterPipe implements PipeTransform {
  transform(val: any[], args: string): any[] {
    let value = val;
    if(args.trim() !== '') {
      value = _.filter(val, d => _.includes(d.name, args) || _.includes(d.description, args));
    }
    return value;
  }
}


@Pipe({name: 'directoryFilter'})
export class DirectoryFilterPipe implements PipeTransform {
  transform(val: any[], args: any): any[] {
    const id = args == null || args === 'all' ? 0 : args;
    const value = _.filter(val, d => _.isEqual(d.dir_id, id));
    return value;
  }
}


// 데이터 타입을 아이콘으로 변경 , args?: any
@Pipe({name: 'boxShadow'})
export class BoxShadowPipe implements PipeTransform {
  transform(val: any): string {
    let box_shadow = '';
    if(val.enabled) {
      box_shadow = val.color + ' ';
      box_shadow += val.hor_len + 'px ';
      box_shadow += val.ver_len + 'px ';
      box_shadow += val.blur_radius + 'px ';
      box_shadow += val.spread_radius + 'px';
    } else {
      box_shadow = 'none';
    }
    return box_shadow;
  }
}

// Group By , args?: string
@Pipe({name: 'groupBy'})
export class GroupByPipe implements PipeTransform {
  transform(val: any[], args:string): any {
    return _.groupBy(val, args);
  }
}

@Pipe({name: 'timeValue'})
export class TimeValuePipe implements PipeTransform {
  transform(val: any, args?: any): any {
    return numeral(val).format('00');
  }
}

@Pipe({name: 'contrast'})
export class ContrastPipe implements PipeTransform {
  transform(val: any, args?: any): any {
    const hexcolor = val.replace("#", "");
    const r = parseInt(hexcolor.substr(0,2),16);
    const g = parseInt(hexcolor.substr(2,2),16);
    const b = parseInt(hexcolor.substr(4,2),16);
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
  }
}

@Pipe({name: 'stateBackground'})
export class StateBackgroundPipe implements PipeTransform {
  transform(val: any, args?: any): any {
    let hexcolor = val.replace("#", "");
    let r = parseInt(hexcolor.substr(0,2),16);
    let g = parseInt(hexcolor.substr(2,2),16);
    let b = parseInt(hexcolor.substr(4,2),16);
    let yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
  }
}



@Pipe({name: 'legendIcon'})
export class LegendIconPipe implements PipeTransform {
  transform(val: any, args?: any): string {
    const d = d3.symbol().type(args.iconPoint(val))
    if(args.charType === 'line') d.size(40);
    return <string>d();
  }
}

@Pipe({name: 'arrStr'})
export class ArrStrPipe implements PipeTransform {
  transform(val: any): any {
    return val.join(', ');
  }
}

@Pipe({name: 'colors'})
export class ColorsPipe implements PipeTransform {
  transform(val: any): string {
    // @ts-ignore
    const max = _.maxBy(val, 'value').value;
    // @ts-ignore
    const min = _.minBy(val, 'value').value;
    const value: any = [];
    _.forEach(val, (v, k) => {
      const per = ((v.value - min) * 100) / (max - min);
      value.push(v.color + ' ' + per + '%');
    });
    return value.join(', ');
  }
}

//gradientColors
@Pipe({name: 'gradientColors'})
export class GradientColorsPipe implements PipeTransform {
  transform(val: string[]): string {
    // const max = _.maxBy(val, 'value').value;
    // const min = _.minBy(val, 'value').value;
    const value: any = [];
    _.forEach(val, (v, k) => {
      // const per = ((v.value - min) * 100) / (max - min);
      value.push(v); // .color + ' ' + per + '%'
    });
    return value.join(', ');
  }
}

@Pipe({name: 'thresPer'})
export class ThresPerPipe implements PipeTransform {
  transform(val: number, args?: Array<any>): any {
    const max = _.maxBy(args, 'value').value;
    const min = _.minBy(args, 'value').value;
    const value = ((val - min) * 100) / (max - min);
    return value;
  }
}

/*local filter data field에 맞는 데이터 가져오기*/
@Pipe({name: 'localFilterPipe'})
export class LocalFilterPipe implements PipeTransform{
  transform(val: Array<any>, args?: any): any {
    let result: any[] = [];
    result.splice(0, 0, { name: '(전체)'});
    const field = args.field
    const data = _.map(val, d => {
      return { name: d[field]};
    });

    result = [...result, ...data];
    // if(args.allEnabled) result.unshift({ name: '(전체)' });
    return _.uniqBy(result, 'name');
  }
}

/*local filter data field에 맞는 데이터 가져오기*/
@Pipe({name: 'customFilterList'})
export class CustomFilterList implements PipeTransform{
  transform(val: Array<any>, args?: any): any {
    let colList = [{label: '(전체)', value: 'all'}];
    colList = val ? [...colList, ...val] : [...colList];
    return colList;
  }
}

@Pipe({name: 'getFieldTypeof'})
export class GetFieldTypeofPipe implements PipeTransform{
  transform(val: any): any {
    if (typeof val === 'number') {
      return true;
    }
    return false;
  }
}

@Pipe({name: 'sliderTrans'})
export class SliderTrans implements PipeTransform{
  transform(val: any): any {
    val = {
      ...val,
      translate: (value: number): string => { // ngx-slider translate
        return moment(value).format('YY-MM-DD')
      }
    }
    return val;
  }
}
