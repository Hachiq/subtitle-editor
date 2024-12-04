import { Component, inject } from '@angular/core';
import { SAMPLE_SRT_SUBTITLES } from '../../constants/sample-srt-subtitles';
import { FileService } from '../../services/file.service';
import { EntriesService } from '../../services/entries.service';
import { SrtService } from '../../services/srt.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  public fileService = inject(FileService);
  public entriesService = inject(EntriesService);

  private srtService = inject(SrtService);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileService.setFile(file);
      
      const validExtensions = ['srt', 'vtt'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension && validExtensions.includes(fileExtension)) {
        const reader = new FileReader();
        reader.onload = () => {
          const entries = this.srtService.parseSrt(reader.result as string)
          this.entriesService.setEntries(entries);
        };
        reader.readAsText(file);
      } else {
        console.error('Invalid file type. Please select a .srt or .vtt file.');
      }
    }
  }

  createSample() {
    this.entriesService.setEntries(SAMPLE_SRT_SUBTITLES);
  }

  clearFile(fileInput: HTMLInputElement): void {
    fileInput.value = '';
    this.fileService.clearFile();
  }
}
