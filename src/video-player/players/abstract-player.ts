import { type StateLogger } from '../console-logger';
import { PlayerState } from '../player-state';
import { VideoPlayerObserver } from '../video-player-state-observer';

export abstract class Player {
  private observer: VideoPlayerObserver | null = null;

  constructor(protected videoElement: HTMLVideoElement, protected logger: StateLogger) {
    this.observer = new VideoPlayerObserver(videoElement);
    this.observer.init((state, prevState, secondsElapsed) => this.handleStateChange(state, prevState, secondsElapsed));
  }

  abstract load(url: string): void;

  dispose(): void {
    this.observer?.dispose();
  }

  handleStateChange(state: PlayerState, prevState: PlayerState, secondsElapsed: number): void {
    if (prevState === PlayerState.BUFFERING) {
      this.logger.log(`${PlayerState.BUFFERING} took ${secondsElapsed} seconds`);
    }
    this.logger.log(state)
  }
}
