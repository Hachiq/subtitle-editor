import { Injectable } from '@angular/core';
import { SubtitleEntrySrt } from '../models/subtitle-entry-srt';

@Injectable({
  providedIn: 'root'
})
export class SrtService {

  parseSrt(srtContent: string): SubtitleEntrySrt[] {
    const entries: SubtitleEntrySrt[] = [];
    
    // Split the content into blocks using double line breaks
    const blocks = srtContent.split(/\r?\n\r?\n/);
  
    for (const block of blocks) {
      const lines = block.split(/\r?\n/);
  
      if (lines.length >= 3) {
        const id = parseInt(lines[0], 10); // The first line is the ID
        const timeMatch = lines[1].match(/(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/);
        
        if (timeMatch) {
          const startTime = timeMatch[1];
          const endTime = timeMatch[2];
          const text = lines.slice(2).join(' '); // Combine all text lines
  
          entries.push({ id, startTime, endTime, text });
        }
      }
    }
  
    return entries;
  }
  
}
