import { ConsoleLogger } from './console-logger';
import type { Player } from './players/abstract-player';
import { BrowserPlayer } from './players/browser-player';
import { DashPlayer } from './players/dash-player';
import { HLSPlayer } from './players/hls-player';

export const createPlayer = (
  videoElement: HTMLVideoElement,
  url: string,
): Player => {
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.endsWith('.m3u8')) {
    return new HLSPlayer(videoElement, new ConsoleLogger('HLSPlayer'));
  }

  if (lowerUrl.endsWith('.mpd')) {
    return new DashPlayer(videoElement, new ConsoleLogger('DashPlayer'));
  }

  return new BrowserPlayer(videoElement, new ConsoleLogger('BrowserPlayer'));
};
