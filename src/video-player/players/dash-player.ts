import { MediaPlayer } from 'dashjs';
import { Player } from './abstract-player';

export class DashPlayer extends Player {
  private player = MediaPlayer().create();
  
  load(url: string) {
    this.player.initialize(this.videoElement, url, true);
  }

  dispose(): void {
    super.dispose()
    this.player.destroy();
  }
}
