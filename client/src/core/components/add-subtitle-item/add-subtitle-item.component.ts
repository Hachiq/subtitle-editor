import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-subtitle-item',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './add-subtitle-item.component.html',
  styleUrl: './add-subtitle-item.component.scss'
})
export class AddSubtitleItemComponent {
  iplus = faPlus;
}
