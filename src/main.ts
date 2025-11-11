import { VideoPlayer } from './video-player';

const videoElement = document.querySelector<HTMLVideoElement>('#video');
const videoSelectElement = document.querySelector<HTMLSelectElement>('#video-select');

if (videoSelectElement && videoElement) {
  const player = new VideoPlayer(videoElement);

  videoSelectElement.addEventListener('change', (event) => {
    const value = (event.target as HTMLSelectElement).value;
    player.load(value);
  });

}

