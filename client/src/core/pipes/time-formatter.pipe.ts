import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../models/time';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimeFormatterPipe implements PipeTransform {
  transform(time: Time): string {
    if (!time) {
      return '00:00:00:000';
    }

    const formatWithLeadingZeros = (value: number, length: number): string =>
      value.toString().padStart(length, '0');

    const hours = formatWithLeadingZeros(time.h, 2);
    const minutes = formatWithLeadingZeros(time.m, 2);
    const seconds = formatWithLeadingZeros(time.s, 2);
    const milliseconds = formatWithLeadingZeros(time.ms, 3);

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }
}
