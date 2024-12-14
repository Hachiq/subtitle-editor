import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SubEditorService } from '../../services/sub-editor.service';
import { SubtitlesStorageService } from '../../services/subtitles-storage.service';

@Component({
  selector: 'app-add-subtitle-item',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './add-subtitle-item.component.html',
  styleUrl: './add-subtitle-item.component.scss'
})
export class AddSubtitleItemComponent {
  iplus = faPlus;

  @Input() index!: number;

  @Output() segmentAdded = new EventEmitter<number>();

  private editor = inject(SubEditorService);
  private subs = inject(SubtitlesStorageService);

  // TODO: Consider only emitting event here, and use the services on the other side
  onAdd() {
    this.editor.addSegment(this.subs.getSubtitles(), this.index);
    this.segmentAdded.emit(this.index);
  }
}
