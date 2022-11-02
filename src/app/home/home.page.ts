import { Component, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';
import { Howl, Howler } from 'howler';

export interface Track {
  name: string;
  path: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  playlist: Track[] = [
    {
      name: 'Opening',
      path: 'assets/mp3/01 Opening.mp3'
    },
    {
      name: 'The Walk Home',
      path: 'assets/mp3/02 The Walk Home.mp3'
    },
    {
      name: 'The Closet',
      path: 'assets/mp3/03 The Closet.mp3'
    },
    {
      name: 'Nick & Sam',
      path: 'assets/mp3/04 Nick & Sam.mp3'
    },
    {
      name: 'The Roof',
      path: 'assets/mp3/05 The Roof.mp3'
    },
    {
      name: 'The Pool',
      path: 'assets/mp3/06 The Pool.mp3'
    },
    {
      name: 'Shopping',
      path: 'assets/mp3/07 Shopping.mp3'
    },
    {
      name: 'The Cabin',
      path: 'assets/mp3/08 The Cabin.mp3'
    },
    {
      name: 'Nick & Sam pt. II',
      path: 'assets/mp3/09 Nick & Sam pt. II.mp3'
    },
    {
      name: 'The Pool pt. II',
      path: 'assets/mp3/10 The Pool pt. II.mp3'
    },
    {
      name: 'Nick & The Nightingale',
      path: 'assets/mp3/11 Nick & The Nightingale.mp3'
    },
    {
      name: 'The Drawers',
      path: 'assets/mp3/12 The Drawers.mp3'
    },
    {
      name: 'The Dream',
      path: 'assets/mp3/13 The Dream.mp3'
    },
    {
      name: 'Nick & The Nightingale pt. II',
      path: 'assets/mp3/14 Nick & The Nightingale pt. II.mp3'
    },
    {
      name: 'Closing',
      path: 'assets/mp3/15 Closing.mp3'
    },
    {
      name: 'Credits',
      path: 'assets/mp3/16 Credits.mp3'
    },
  ];

  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  totalLength: string;
  strProgress: string;

  @ViewChild('range', {static: false}) range: IonRange;

  constructor() {}

  start(track: Track) {

    if (this.player) {
      this.player.stop();
    }

    this.player = new Howl({
      src: [track.path],
      html5: true,
      onplay: () => {
        console.log('onplay');
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
        this.totalLength = this.durationToTime(this.player.duration());
      },
      onend: () => {
        console.log('onend');
      }
    });

    this.player.play();

  }

  togglePlayer(pause) {
    this.isPlaying = !pause;

    if (pause) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  prev() {
    let index = this.playlist.indexOf(this.activeTrack);
    if (index > 0) {
      this.start(this.playlist[index - 1]);
    } else {
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }

  next() {
    let index = this.playlist.indexOf(this.activeTrack);
    if (index != this.playlist.length - 1) {
      this.start(this.playlist[index + 1]);
    } else {
      this.start(this.playlist[0]);
    }
  }

  // uso de ion-range con porcentaje

  seek() {
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    // se obtiene segundo actual
    let seek = this.player.seek();
    // se convierte ese segundo a porcentaje
    this.progress = (seek / this.player.duration()) * 100 || 0;
    // se convierte ese segundo a minutos y segundos en formato 00:00
    this.strProgress = this.durationToTime(seek);
    // se actualiza
    setTimeout(() => {
      this.updateProgress();
    } , 500);
  }

  // cconvertir segundos a minutos y segundos en formato 00:00
  durationToTime(duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration - minutes * 60);
    let strMins = minutes < 10 ? '0' + minutes : minutes;
    let strSecs = seconds < 10 ? '0' + seconds : seconds;
    return strMins + ':' + strSecs;
  }

}
