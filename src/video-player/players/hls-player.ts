import Hls from 'hls.js';
import { Player } from './abstract-player';

export class HLSPlayer extends Player {
  private hls = new Hls();

  load(url: string) {
    if (Hls.isSupported()) {
      this.hls.loadSource(url);
      this.hls.attachMedia(this.videoElement);
      this.videoElement.play();
    }
  }
  dispose(): void {
    super.dispose();
    this.hls.detachMedia()
    this.hls.destroy();
  }
}
