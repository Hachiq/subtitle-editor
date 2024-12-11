import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { SubtitleSegment } from '../../models/subtitle-segment';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubEditorService } from '../../services/sub-editor.service';
import { SubtitlesStorageService } from '../../services/subtitles-storage.service';
import { Time } from '../../models/time';

@Component({
  selector: 'app-subtitle-editor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './subtitle-editor.component.html',
  styleUrl: './subtitle-editor.component.scss'
})
export class SubtitleEditorComponent implements OnChanges {
  @Input() subtitle!: SubtitleSegment;
  @Input() index!: number;

  @Output() saved = new EventEmitter();

  editorForm = new FormGroup({
    startH: new FormControl(0, [Validators.min(0), Validators.max(999), Validators.required]),
    startM: new FormControl(0, [Validators.min(0), Validators.max(59), Validators.required]),
    startS: new FormControl(0, [Validators.min(0), Validators.max(59), Validators.required]),
    startMs: new FormControl(0, [Validators.min(0), Validators.max(999), Validators.required]),

    endH: new FormControl(0, [Validators.min(0), Validators.max(999), Validators.required]),
    endM: new FormControl(0, [Validators.min(0), Validators.max(59), Validators.required]),
    endS: new FormControl(0, [Validators.min(0), Validators.max(59), Validators.required]),
    endMs: new FormControl(0, [Validators.min(0), Validators.max(999), Validators.required]),

    text: new FormControl('', [Validators.maxLength(300)]),
  })

  editor = inject(SubEditorService);
  subsStorage = inject(SubtitlesStorageService);

  ngOnChanges(changes: SimpleChanges): void {
    this.setInitialValues();
  }

  save() {
    if (this.editorForm.invalid) {
      return;
    }

    const subs = this.subsStorage.getSubtitles();

    const endTimeDifference = this.editor.calculateTimeDifference(this.subtitle.endTime, this.getEndTimeFromControls());
    
    subs[this.index] = this.createNewSubtitleSegment();

    if (endTimeDifference) {
      this.editor.adjustSubtitleTimesFromIndex(subs, this.index + 1, endTimeDifference);
    }

    this.saved.emit();
  }

  setInitialValues(): void {
    const { startTime, endTime, text } = this.subtitle;

    this.editorForm.setValue({
      startH: startTime.h,
      startM: startTime.m,
      startS: startTime.s,
      startMs: startTime.ms,
      endH: endTime.h,
      endM: endTime.m,
      endS: endTime.s,
      endMs: endTime.ms,
      text: text
    });
  }

  getStartTimeFromControls(): Time {
    const h = this.editorForm.controls.startH.value ?? 0;
    const m = this.editorForm.controls.startM.value ?? 0;
    const s = this.editorForm.controls.startS.value ?? 0;
    const ms = this.editorForm.controls.startMs.value ?? 0;

    return { h, m, s, ms }
  }

  getEndTimeFromControls(): Time {
    const h = this.editorForm.controls.endH.value ?? 0;
    const m = this.editorForm.controls.endM.value ?? 0;
    const s = this.editorForm.controls.endS.value ?? 0;
    const ms = this.editorForm.controls.endMs.value ?? 0;

    return { h, m, s, ms }
  }

  getTextFromControls(): string {
    return this.editorForm.controls.text.value ?? '';
  }

  createNewSubtitleSegment() : SubtitleSegment {
    let sub = this.subtitle;

    sub.startTime = this.getStartTimeFromControls();
    sub.endTime = this.getEndTimeFromControls();
    sub.text = this.getTextFromControls();

    return sub;
  }

  restrictToMax(event: Event, max: number): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    const controlName = input.getAttribute('formControlName');
  
    if (value > max && controlName) {
      this.editorForm.get(controlName)?.setValue(max);
    }
  }
}
