import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubEditorService } from '../../services/sub-editor.service';
import { Time } from '../../models/time';
import { SubtitlesStorageService } from '../../services/subtitles-storage.service';

@Component({
  selector: 'app-shifter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './shifter.component.html',
  styleUrl: './shifter.component.scss'
})
export class ShifterComponent {
  shiftForm = new FormGroup({
    hours: new FormControl(0, [Validators.min(0), Validators.max(999), Validators.required]),
    minutes: new FormControl(0, [Validators.min(0), Validators.max(59), Validators.required]),
    seconds: new FormControl(0, [Validators.min(0), Validators.max(59), Validators.required]),
    milliseconds: new FormControl(0, [Validators.min(0), Validators.max(999), Validators.required]),
  });

  editor = inject(SubEditorService);
  subtitlesStorage = inject(SubtitlesStorageService);

  shift() {
    const timeOffset = this.getTimeOffsetFromControls();
    const timeOffsetMs = this.editor.convertTimeToMilliseconds(timeOffset);
    const subtitles = this.subtitlesStorage.getSubtitles();

    if (subtitles) {
      this.editor.adjustSubtitleTimesFromIndex(subtitles, 0, timeOffsetMs, 'forward', 'add');
    }
  }

  getTimeOffsetFromControls(): Time {
      const h = this.shiftForm.controls.hours.value ?? 0;
      const m = this.shiftForm.controls.minutes.value ?? 0;
      const s = this.shiftForm.controls.seconds.value ?? 0;
      const ms = this.shiftForm.controls.milliseconds.value ?? 0;
  
      return { h, m, s, ms }
    }

  restrictToMax(event: Event, max: number): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    const controlName = input.getAttribute('formControlName');
  
    if (value > max && controlName) {
      this.shiftForm.get(controlName)?.setValue(max);
    }
  }
}
