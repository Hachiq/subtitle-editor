import { Injectable } from '@angular/core';
import { SubtitleSegment } from '../models/subtitle-segment';
import { Time } from '../models/time';

@Injectable({
  providedIn: 'root'
})
export class SubEditorService {
  /**
   * Adjusts the start and end times of subtitles from a specified index by a given time offset.
   * 
   * @param subtitles - The list of subtitle segments to modify.
   * @param fromIndex - The index from which to start applying the time adjustment.
   * @param timeOffsetMs - The time offset in milliseconds to add to each subtitle's start and end times.
   */
  adjustSubtitleTimesFromIndex(subtitles: SubtitleSegment[], fromIndex: number, timeOffsetMs: number): void {
    if (fromIndex < 0 || fromIndex >= subtitles.length) {
      console.warn("Invalid starting index provided.");
      return;
    }

    subtitles.forEach((subtitle, index) => {
      if (index >= fromIndex) {
        subtitle.startTime = this.addTimeOffset(subtitle.startTime, timeOffsetMs);
        subtitle.endTime = this.addTimeOffset(subtitle.endTime, timeOffsetMs);
      }
    });
  }

  /**
   * Adds a time offset to a Time object and handles overflow (e.g., seconds to minutes).
   * 
   * @param time - The original Time object.
   * @param offsetMs - The time offset in milliseconds.
   * @returns A new Time object with the adjusted time.
   */
  addTimeOffset(time: Time, offsetMs: number): Time {
    const totalMs = time.ms + offsetMs;
    const ms = totalMs % 1000;
    const totalSeconds = time.s + Math.floor(totalMs / 1000);
    const s = totalSeconds % 60;
    const totalMinutes = time.m + Math.floor(totalSeconds / 60);
    const m = totalMinutes % 60;
    const h = time.h + Math.floor(totalMinutes / 60);

    return { h, m, s, ms };
  }

  /**
   * Calculates the difference between two Time objects in milliseconds.
   * 
   * @param initialEndTime - The initial end time (optional).
   * @param endTime - The subtitle's end time.
   * @returns The difference in milliseconds or `null` if `initialEndTime` is not provided.
   */
  calculateTimeDifference(initialEndTime: Time | undefined, endTime: Time): number | null {
    if (!initialEndTime) {
      return null;
    }

    const initialEndTimeMs = this.convertTimeToMilliseconds(initialEndTime);
    const endTimeMs = this.convertTimeToMilliseconds(endTime);

    return endTimeMs - initialEndTimeMs;
  }

  /**
   * Converts a Time object to milliseconds.
   * 
   * @param time - The Time object to convert.
   * @returns The total time in milliseconds.
   */
  convertTimeToMilliseconds(time: Time): number {
    return time.h * 3600000 + time.m * 60000 + time.s * 1000 + time.ms;
  }
}
