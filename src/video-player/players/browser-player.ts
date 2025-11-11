import { PlayerState } from '../player-state';
import { Player } from './abstract-player';

export class BrowserPlayer extends Player {
  load(url: string) {
    this.videoElement.src = url;
    this.videoElement.play();
  }
}
