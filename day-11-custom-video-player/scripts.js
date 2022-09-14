//get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


//functions
function togglePlay() {
    const method = video.paused ? "play" : "pause";
    video[method]();
}


function updateButton() {
    const button = video.paused ? "►" : "▮▮";
    toggle.textContent = button;
}


function skip(e) {
    video.currentTime += parseFloat(e.target.dataset.skip);
}

function handleRange(e) {
    video[e.name] = e.target.value;
}


function handleProgress() {
    const percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


//events
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => {
    button.addEventListener('click', skip);
});

ranges.forEach(range => {
    range.addEventListener('change', handleRange);
    range.addEventListener('mousemove', handleRange);
});


let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
    if(mousedown) {
        scrub(e);
    }
});
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

