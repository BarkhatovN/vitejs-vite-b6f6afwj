import { createPlayer } from './create-player';
import type { Player } from './players/abstract-player';

export class VideoPlayer {
  private videoElement: HTMLVideoElement;
  private currentPlayer: Player | null = null;

  constructor(el: HTMLVideoElement) {
    this.videoElement = el;
  }

  load(url: string): void {
    if (this.currentPlayer) this.currentPlayer.dispose();

    if (!URL.canParse(url)) {
      return;
    }
    
    this.currentPlayer = createPlayer(this.videoElement, url);
    this.currentPlayer.load(url);
  }
}
