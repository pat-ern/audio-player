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
      name: 'Kl',
      path: 'assets/mp3/grandma-fybh-ep-01-kl.mp3'
    },
    {
      name: 'Poke',
      path: 'assets/mp3/grandma-fybh-ep-02-poke.mp3'
    },
    {
      name: 'Are we dead yet?',
      path: 'assets/mp3/grandma-fybh-ep-03-are-we-dead-yet.mp3'
    },
    {
      name: 'Comics Battle',
      path: 'assets/mp3/grandma-fybh-ep-04-comics-battle.mp3'
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
