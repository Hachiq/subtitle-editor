import { Injectable } from '@angular/core';
import { SubtitleSegment } from '../models/subtitle-segment';

@Injectable({
  providedIn: 'root'
})
export class SubtitlesStorageService {
  private subtitles: SubtitleSegment[] = [];

  setSubtitles(subtitles: SubtitleSegment[]): void {
    this.subtitles = subtitles;
  }

  getSubtitles(): SubtitleSegment[] {
    return this.subtitles;
  }
}
