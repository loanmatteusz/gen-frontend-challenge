import {Component, OnDestroy, OnInit} from '@angular/core';
import {MusicService} from "../../services/music.service";
import {Music} from "../../models/music.model";
import {MusicModalComponent} from "../components/music-modal/music-modal.component";
import {MusicCardComponent} from "../components/music-card/music-card.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SubSink} from "subsink";
import {NgClass} from "@angular/common";

export enum FORM_ACTION {
  ADD = "ADD",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [
    MusicCardComponent,
    MusicModalComponent,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent implements OnInit, OnDestroy {
  private sub = new SubSink();
  protected musics: Music[] = [];
  protected musicId: string | null = null;

  protected musicForm!: FormGroup;

  protected isModalOpened = false;
  protected isUpdate = false;

  protected actionForm: FORM_ACTION | null = null;
  protected readonly FORM_ACTION = FORM_ACTION;


  public constructor(
    private musicService: MusicService,
    private formBuilder: FormBuilder,
  ) {
    this.musicForm = this.formBuilder.group({
      title: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      link: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public ngOnInit() {
    this.listMusics().subscribe({
      next: (musics) => {
        this.musics = musics;
      }
    });
  }

  private listMusics() {
    return this.musicService.list();
  }

  public loadMusicForm(music: Music) {
    console.log({music});
    this.musicId = music.id!;
    this.musicForm.patchValue({
      title: music.title,
      link: music.link,
    });
    this.isUpdate = true;
    this.openMusicModal();
  }

  public openMusicModal() {
    this.isModalOpened = true;
  }

  public setActionFormTo(value: FORM_ACTION) {
    this.actionForm = value;
  }

  public submit() {
    if (this.actionForm === FORM_ACTION.ADD) {
      this.addMusic();
    } else if (this.actionForm === FORM_ACTION.UPDATE) {
      this.updateMusic();
    } else if (this.actionForm === FORM_ACTION.DELETE) {
      this.removeMusic();
    }
    this.actionForm = null;
  }

  private resetForm() {
    this.musicId = null;
    this.musicForm.reset();
  }

  public closeModal() {
    this.isModalOpened = false;
    this.isUpdate = false;
    this.resetForm();
  }

  public addMusic() {
    if (this.musicForm.valid) {
      this.sub.sink = this.sub.sink = this.musicService
        .add(this.musicForm.value)
        .subscribe({
          complete: () => {
            this.musicForm.reset();
            this.closeModal();
          },
          next: (value) => {
            const music = value as Music;
            this.musics = [...this.musics, music];
          },
          error: (err: any) => {
            console.error(err.message);
          },
        });
    } else {
      this.musicForm.markAllAsTouched();
    }
  }

  public updateMusic() {
    const musicId = this.musicId!;
    this.sub.sink = this.musicService.update({id: musicId, title: this.musicForm.value.title, link: this.musicForm.value.link})
      .subscribe({
        complete: () => {
          this.musicForm.reset();
          this.closeModal();
        },
        next: (value) => {
          const index = this.musics.findIndex((music) => value.data?.updateMusic.id === music.id);
          if (index > -1) {
            const copy = [...this.musics];
            copy[index] = {
              id: value.data?.updateMusic.id!,
              title: value.data?.updateMusic.title!,
              link: value.data?.updateMusic.link!,
            };
            this.musics = [...copy];
          }
          return this.musics;
        },
        error: (err: any) => {
          console.error(err.message);
        },
      });
    this.closeModal();
  }

  public removeMusic() {
    const musicId = this.musicId!;
    this.sub.sink = this.musicService.remove({musicId})
      .subscribe({
        complete: () => {
          this.musics = this.musics.filter(music => music.id !== musicId);
        },
      });
    this.closeModal();
  }
}
