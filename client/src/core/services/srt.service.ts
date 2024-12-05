import { Injectable } from '@angular/core';
import { SubtitleSegment } from '../models/subtitle-segment';
import { Time } from '../models/time';

@Injectable({
  providedIn: 'root'
})
export class SrtService {

  parseSrt(srt: string): SubtitleSegment[] {
    const subs: SubtitleSegment[] = [];
    const regex = /(\d+)\s+([\d:,]+) --> ([\d:,]+)\s+([\s\S]*?)(?=\n\n|\n$|$)/g;
    let match: RegExpExecArray | null;
  
    while ((match = regex.exec(srt)) !== null) {
      const id = parseInt(match[1], 10);
  
      // Parse time strings into Time objects
      const startTime = this.parseTime(match[2]);
      const endTime = this.parseTime(match[3]);
  
      const text = match[4].trim();
      subs.push({ id, startTime, endTime, text });
    }
  
    return subs;
  }

  parseTime(timeString: string): Time {
    const [h, m, s, ms] = timeString
      .replace(',', ':') // Replace ',' with ':' for easier splitting
      .split(':')
      .map((value) => parseInt(value, 10));
  
    return { h, m, s, ms };
  }
}
