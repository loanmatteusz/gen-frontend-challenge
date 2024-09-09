import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-music-card',
  standalone: true,
  imports: [],
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.css'
})
export class MusicCardComponent {
  @Input() music!: { id: string; title: string; link: string };
}
