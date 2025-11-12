import { Component, inject } from '@angular/core';
import { MediaFileStorageService } from '../../services/media-file-storage.service';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss'
})
export class GeneratorComponent {
  previewUrl: string | ArrayBuffer | null = null;
  isVideo: boolean = false;
  isAudio: boolean = false;

  mediaFileService = inject(MediaFileStorageService);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      this.mediaFileService.setFile(file);
      const fileType = file.type;
      this.isVideo = fileType.startsWith('video/');
      this.isAudio = fileType.startsWith('audio/');

      const fileURL = URL.createObjectURL(file);
      this.previewUrl = fileURL;
    }
  }
}
