import { Injectable } from '@angular/core';
import { SubtitleEntrySrt } from '../models/subtitle-entry-srt';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  private entries: SubtitleEntrySrt[] = [];

  setEntries(entries: SubtitleEntrySrt[]): void {
    this.entries = entries;
  }

  getEntries(): SubtitleEntrySrt[] {
    return this.entries;
  }
}
