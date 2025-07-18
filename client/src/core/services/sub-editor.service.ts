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
    // Convert the original time to milliseconds
    let totalMs = time.h * 3600000 + time.m * 60000 + time.s * 1000 + time.ms + offsetMs;

    // Clamp to zero if negative
    totalMs = Math.max(0, totalMs);

    const h = Math.floor(totalMs / 3600000);
    totalMs %= 3600000;
    const m = Math.floor(totalMs / 60000);
    totalMs %= 60000;
    const s = Math.floor(totalMs / 1000);
    const ms = totalMs % 1000;

    return { h, m, s, ms };
  }

  /**
   * Calculates the difference between two Time objects in milliseconds.
   * 
   * @param initialEndTime - The initial end time (optional).
   * @param endTime - The subtitle's end time.
   * @returns The difference in milliseconds or `null` if `initialEndTime` is not provided.
   */
  calculateTimeDifference(initialEndTime: Time, endTime: Time): number {

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

  /**
   * Inserts a new subtitle segment at the specified index in the subtitles array.
   * The IDs of all segments are updated to ensure sequential order after insertion.
   *
   * @param subtitles - The array of subtitle segments to modify.
   * @param atIndex - The position to insert the new segment. If out of bounds,
   * it defaults to the start or end of the array.
   */
  addSegment(subtitles: SubtitleSegment[], atIndex: number): void {
    // Ensure atIndex is within valid bounds
    atIndex = Math.max(0, Math.min(atIndex, subtitles.length));

    const segmentBefore = subtitles[atIndex - 1];
    const segmentAfter = subtitles[atIndex];

    const newSegment: SubtitleSegment = {
      id: segmentAfter ? segmentAfter.id : (segmentBefore ? segmentBefore.id + 1 : 1),
      startTime: segmentBefore ? segmentBefore.endTime : segmentAfter?.startTime ?? { h: 0, m: 0, s: 0, ms: 0 },
      endTime: segmentAfter ? segmentAfter.startTime : segmentBefore?.endTime ?? { h: 0, m: 0, s: 0, ms: 0 },
      text: '',
    };

    // Insert the new segment and update IDs
    subtitles.splice(atIndex, 0, newSegment);
    subtitles.forEach((segment, index) => (segment.id = index + 1));
  }

  /**
   * Removes a subtitle segment at the specified index from the subtitles array.
   * The IDs of all segments are updated to ensure sequential order after removal.
   *
   * @param subtitles - The array of subtitle segments to modify.
   * @param index - The index of the segment to remove. If out of bounds, no action is taken.
   */
  removeSegment(subtitles: SubtitleSegment[], index: number): void {
    if (index < 0 || index >= subtitles.length) {
      console.warn("Invalid index provided for removal.");
      return;
    }

    subtitles.splice(index, 1);
    subtitles.forEach((segment, idx) => (segment.id = idx + 1));
  }
}
