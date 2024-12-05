import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
  private selectedFile: File | null = null;

  setFile(file: File): void {
    this.selectedFile = file;
  }

  getFile(): File | null {
    return this.selectedFile;
  }

  clearFile() {
    this.selectedFile = null;
  }
}
