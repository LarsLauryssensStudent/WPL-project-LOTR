function playVideo(index) {
  const video = document.getElementById(`video-${index}`);
  video.style.display = 'block';
  video.play();
}

function pauseVideo(index) {
  const video = document.getElementById(`video-${index}`);
  video.pause();
  video.currentTime = 0;
  video.style.display = 'none';
}