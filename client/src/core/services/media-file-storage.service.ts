import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaFileStorageService {

  private selectedMediaFile: File | null = null;

  setFile(file: File): void {
    this.selectedMediaFile = file;
  }
  getFile(): File | null {
    return this.selectedMediaFile;
  }
  clearFile() {
    this.selectedMediaFile = null;
  }
  hasFile(): boolean {
    return this.selectedMediaFile !== null;
  }
}
