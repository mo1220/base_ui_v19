import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

@Pipe({ name: 'time' })
export class TimePipe implements PipeTransform {
  transform(value: any, format:any) {
    // format : 12H일 경우 'hh:mm a' , 24H일 경우 'HH:mm'
    if(value) {
      let res = moment(value).format(format);
      return res;
    }
    else return;
  }
}

@Pipe({ name: 'dateRange' })
export class DateRangePipe implements PipeTransform {
  transform(value: Array<any>, format:any) {
    // [ start, end ]를 받아 format 변경
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
    if (betweenTimeDay < 30) {
      return `${betweenTimeDay}일전`;
    }

    const betweenTimeMonth = Math.floor(moment().diff(moment(timeValue), 'months', true));
    if (betweenTimeMonth < 12) {
      return `${betweenTimeMonth}달전`;
    }

    const betweenTimeYear = Math.floor(moment().diff(moment(timeValue), 'years', true));
    if (betweenTimeYear < 10) {
      return `${betweenTimeYear}년전`;
    }

    return format ? `${moment(value).format(format)}` : `${moment(value).format('YYYY-MM-DD HH:mm:ss')}`;
  }
}
