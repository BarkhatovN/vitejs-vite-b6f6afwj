import { PlayerState } from './player-state';

export class VideoPlayerObserver {
  private currentState?: { state: PlayerState, date: Date };
  private listeners: ((state: PlayerState, prevState: PlayerState | null, secondsElapsed: number) => void)[] = [];
  private eventHandlers: { event: string, handler: () => void }[] = [
    { event: 'loadstart', handler: () => { this.handleEvent(PlayerState.LOADING) } },
    {
      event: 'progress', handler: () => {
        if (this.videoElement.paused || this.videoElement.currentTime === 0)
          this.handleEvent(PlayerState.LOADING)
      }
    },
    { event: 'canplay', handler: () => this.handleEvent(PlayerState.READY) },
    { event: 'playing', handler: () => this.handleEvent(PlayerState.PLAYING) },
    { event: 'pause', handler: () => this.handleEvent(PlayerState.PAUSED) },
    { event: 'seeking', handler: () => this.handleEvent(PlayerState.SEEKING) },
    { event: 'waiting', handler: () => this.handleEvent(PlayerState.BUFFERING) },
    { event: 'ended', handler: () => this.handleEvent(PlayerState.ENDED) },
  ]

  constructor(private videoElement: HTMLVideoElement) {
  }

  get state() {
    return this.currentState;
  }

  public init(onChange: (state: PlayerState, prevState: PlayerState | null, secondsElapsed: number) => void): void {
    this.addEventListeners();
    this.listeners.push(onChange);
    this.handleEvent(PlayerState.IDLE)
  }

  dispose() {
    this.removeEventListeners();
    this.listeners = [];
  }

  private addEventListeners(): void {
    this.eventHandlers.forEach(({ event, handler }) => {
      this.videoElement.addEventListener(event, handler);
    })
  }

  private removeEventListeners(): void {
    this.eventHandlers.forEach(({ event, handler }) => {
      this.videoElement.removeEventListener(event, handler);
    })
  }

  private handleEvent = (newState: PlayerState) => {
    const prevState = this.currentState?.state;

    if (!prevState) {
      this.currentState = { state: newState, date: new Date() };
      this.listeners.forEach((fn) => {
        fn(newState, null, 0)
      });
      return;
    }

    if (newState !== prevState && this.currentState) {
      const now = new Date();
      const secondsElapsed = (now.getTime() - this.currentState.date.getTime()) / 1_000;
      this.currentState = { state: newState, date: now };
      this.listeners.forEach((fn) => {
        fn(newState, prevState, secondsElapsed)
      });
    }
  }
}
