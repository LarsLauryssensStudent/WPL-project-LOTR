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

//alert voor disabled logins
const buttons = document.querySelectorAll('.custom-disabled-button');
buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        alert('GEEN TOEGANG!\nprobeer lord of the rings');
    });
});