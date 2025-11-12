import { Component, inject } from '@angular/core';
import { MediaFileStorageService } from '../../services/media-file-storage.service';
import { GeneratorService } from '../../services/generator.service';

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
  generatorService = inject(GeneratorService);

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

  generateSubtitles(): void {
    const file = this.mediaFileService.getFile();
    if (!file) {
      console.error('No media file selected.');
      return;
    }
    this.generatorService.generate(file).subscribe({
      next: (response) => {
        console.log('Subtitle generation response:', response);
      },
      error: (error) => {
        console.error('Error generating subtitles:', error);
      }
    });
  }
}
