import {Pipe, PipeTransform} from '@angular/core';
import * as numeral from 'numeral';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as chroma from 'chroma-js';
import * as d3 from 'd3';

@Pipe({ name: 'dateRange' })
export class DateRangePipe implements PipeTransform {
  transform(value: any, format:any) {
    if(value) {
      let res = moment(value[0]).format(format) + ' ~ ' + moment(value[1]).format(format);
      return res;
    }
    else return;
  }
}


@Pipe({ name: 'timeForToday' })
export class TimeForTodayPipe implements PipeTransform {
  transform(value: any, format?:string ): string {
    const today = new Date();
    let timeValue = new Date(value);
    const betweenTime = Math.floor((today.getTime() - (timeValue.getTime())) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }
    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }
    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 10) {
      return `${betweenTimeDay}일전`;
    }
    return format ? `${moment(value).format(format)}` : `${moment(value).format('YYYY-MM-DD HH:mm:ss')}`;
  }
}
