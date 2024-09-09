import { Component } from '@angular/core';
import {MusicComponent} from "../../../music/music.component";
import {MusicCardComponent} from "../../music-card/music-card.component";
import {NavBarComponent} from "../../nav-bar/nav-bar.component";

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [MusicComponent, MusicCardComponent, NavBarComponent],
  templateUrl: './private.component.html',
  styleUrl: './private.component.css'
})
export class PrivateComponent {}
