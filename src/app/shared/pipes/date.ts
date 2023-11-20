import {Pipe, PipeTransform} from '@angular/core';
import * as numeral from 'numeral';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as chroma from 'chroma-js';
import * as d3 from 'd3';

@Pipe({ name: 'dateRange' })
export class DateRangePipe implements PipeTransform {
  transform(value: any, format:any) {
    console.log(value, format);
    return value
  }
}
