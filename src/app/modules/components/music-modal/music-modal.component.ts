import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MusicService} from "../../../services/music.service";
import {NewMusic} from "../../../models/music.model";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SubSink} from "subsink";

@Component({
  selector: 'app-music-modal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './music-modal.component.html',
  styleUrl: './music-modal.component.css'
})
export class MusicModalComponent {
  @Input("visible") public visible: boolean = false;
  @Output() public createMusic = new EventEmitter();
  @Output() handleClose = new EventEmitter();

  public closeModal() {
    this.handleClose.emit(false);
  }
}
