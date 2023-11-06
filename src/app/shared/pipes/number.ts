import {Pipe, PipeTransform} from '@angular/core';
import * as numeral from 'numeral';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as chroma from 'chroma-js';
import * as d3 from 'd3';



@Pipe({ name: 'numeralFormat' })
export class NumeralFormatPipe implements PipeTransform {
  transform(value: any, ags?: any): any {
    const format = ags ? ags : '0,0';
    return numeral(value).format(format);
  }
}

@Pipe({ name: 'thresholdFormat' })
export class ThresholdFormatPipe implements PipeTransform {
  transform(value: number, ags: any): any {
    const format = ags ? ags : '0.0a';
    return Number(value) >= 1000 ? numeral(value).format(format) : value;
  }
}
