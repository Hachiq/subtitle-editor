import { Component, Input } from '@angular/core';
import { SubtitleSegment } from '../../models/subtitle-segment';

@Component({
  selector: 'app-subtitle-editor',
  standalone: true,
  imports: [],
  templateUrl: './subtitle-editor.component.html',
  styleUrl: './subtitle-editor.component.scss'
})
export class SubtitleEditorComponent {
  @Input() subtitle!: SubtitleSegment;
}
