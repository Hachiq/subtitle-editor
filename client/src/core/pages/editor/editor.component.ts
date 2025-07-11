import { Component, inject } from '@angular/core';
import { SAMPLE_SRT_SUBTITLES } from '../../constants/sample-srt-subtitles';
import { FileStorageService } from '../../services/file-storage.service';
import { SubtitlesStorageService } from '../../services/subtitles-storage.service';
import { SrtService } from '../../services/srt.service';
import { SubtitleItemComponent } from '../../components/subtitle-item/subtitle-item.component';
import { SubtitleEditorComponent } from "../../components/subtitle-editor/subtitle-editor.component";
import { SubtitleSegment } from '../../models/subtitle-segment';
import { AddSubtitleItemComponent } from '../../components/add-subtitle-item/add-subtitle-item.component';
import { SubEditorService } from '../../services/sub-editor.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [SubtitleItemComponent, SubtitleEditorComponent, AddSubtitleItemComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  public fileStorage = inject(FileStorageService);
  public subsStorage = inject(SubtitlesStorageService);

  private srtService = inject(SrtService);
  private editorService = inject(SubEditorService);

  selectedSegment: SubtitleSegment | null = null;
  selectedSegmentIndex: number | null = null;

  onSegmentSelected(index: number) {
    this.selectedSegment = this.subsStorage.getSubtitles()[index];
    this.selectedSegmentIndex = index;
  }

  clearSelectedSegment() {
    this.selectedSegment = null;
    this.selectedSegmentIndex = null;
  }

  onSegmentSaved() {
    this.clearSelectedSegment();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileStorage.setFile(file);
      
      const validExtensions = ['srt', 'vtt'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension && validExtensions.includes(fileExtension)) {
        const reader = new FileReader();
        reader.onload = () => {
          const subs = this.srtService.parseSrt(reader.result as string)
          this.subsStorage.setSubtitles(subs);
          this.selectedSegment = null;
        };
        reader.readAsText(file);
      } else {
        console.error('Invalid file type. Please select a .srt or .vtt file.');
      }
    }
  }

  onSegmentRemoved(index: number) {
    this.editorService.removeSegment(this.subsStorage.getSubtitles(), index);
    this.clearSelectedSegment();
  }

  createSample() {
    this.clearSelectedSegment();
    this.subsStorage.setSubtitles(SAMPLE_SRT_SUBTITLES);
  }

  clearFile(fileInput: HTMLInputElement): void {
    fileInput.value = '';
    this.fileStorage.clearFile();
  }
}
