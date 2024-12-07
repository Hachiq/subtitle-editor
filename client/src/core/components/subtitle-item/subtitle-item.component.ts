import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Time } from '../../models/time';
import { CommonModule } from '@angular/common';
import { TimeFormatterPipe } from '../../pipes/time-formatter.pipe';

@Component({
  selector: 'app-subtitle-item',
  standalone: true,
  imports: [CommonModule, TimeFormatterPipe],
  templateUrl: './subtitle-item.component.html',
  styleUrl: './subtitle-item.component.scss'
})
export class SubtitleItemComponent {
  @Input() index!: number;
  @Input() selected!: boolean; 
  
  @Input() id!: number;
  @Input() startTime!: Time;
  @Input() endTime!: Time;
  @Input() text!: string;

  @Output() segmentSelected = new EventEmitter<number>();

  selectSegment() {
    this.segmentSelected.emit(this.index);
  }
}
