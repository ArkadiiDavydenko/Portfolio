const portfolioBtn = document.querySelectorAll('.portfolio-btn');
const portfolioImages = document.querySelectorAll('.portfolio__img');
const portfolioAllBtns = document.querySelector('.portfolio__buttons');
let eventBtn;
portfolioAllBtns.addEventListener('click', (event) => {
    changeImage(event)
})

function changeImage(event) {
    if (event.target.classList.contains('portfolio-btn')) {
        const season = event.target.dataset.season;
        eventBtn = event.target;
        changeClassActive(season);
        portfolioImages.forEach((img, index) => {
            img.src = `./assets/img/${season}/${index + 1}.jpg`
        })
    }
}

function changeClassActive(season) {
    const btnClick = eventBtn;
    portfolioBtn.forEach(btn => {
        btn.classList.remove('button_white');
        btn.classList.add('button_dark');
    })

    portfolioBtn.forEach(btn => {
        if (btn.dataset.season === season) {
            if (btnClick.classList.contains('button_dark')) {
                btn.classList.remove('button_dark');
                btn.classList.add('button_white')
            } else {
                btn.classList.add('button_white');
            }
        }
    })
}

function preloadImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];

    seasons.forEach(season => {
        for (let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${season}/${i}.jpg`;
        }
    })
}

preloadImages();


console.log ("Смена изображений в секции portfolio +25\n "
)


const player = document.querySelector('.player');

const sliderVolume = player.querySelector('.volume-slider');
const video = player.querySelector('.viewer');
const toggleVideo = player.querySelector('.toggle-video');
const toggleVolume = player.querySelector('.toggle-volume');
const playVideo = player.querySelector('.main-button');
const progressVideo = player.querySelector('.progress__line');
const progress = player.querySelector('.progress');
const controlFullScreen = player.querySelector('.player-fullscreen');
const controls = player.querySelector('.player__controls');
const videoTime = player.querySelector('.video-time');
// const slider = player.querySelector('.slider');
const volume = sliderVolume.value / 100;
video.volume = volume;
let progression;
let mousedown;

function switchPlay() {
    if (video.paused) {
        video.play();
        playVideo.style.display = 'none';
        toggleVideo.style.backgroundImage = 'url("./assets/svg/pause.svg")';
        progression = window.setInterval(handleProgress, 20);

    } else {
        video.pause();
        playVideo.style.display = 'block';
        playVideo.style.marginTop = '-93px';
        toggleVideo.style.backgroundImage = 'url("./assets/svg/play.svg")';
    }
}

function switchVolume() {
    if (sliderVolume.value == 0) {
        video.volume = 0.4;
        sliderVolume.value = video.volume * 100;
        toggleVolume.style.backgroundImage = 'url("./assets/svg/volume.svg")';
        changeInput();
    } else if (video.volume) {
        video.volume = 0;
        toggleVolume.style.backgroundImage = 'url("./assets/svg/mute.svg")';
        sliderVolume.value = 0;
        changeInput();
    } else {
        video.volume = sliderVolume.value / 100;
        toggleVolume.style.backgroundImage = 'url("./assets/svg/volume.svg")';
    }
}

function changeInput() {
    video.volume = (sliderVolume.value / 100)
    const value = sliderVolume.value;
    if (sliderVolume.value == 0) {
        toggleVolume.style.backgroundImage = 'url("./assets/svg/mute.svg")';
        sliderVolume.style.background = `linear-gradient(to right, var(--main-gold) 0%, var(--main-gold) ${value}%, #fff ${value}%, white 100%)`
    } else {
        toggleVolume.style.backgroundImage = 'url("./assets/svg/volume.svg")';
        sliderVolume.style.background = `linear-gradient(to right, var(--main-gold) 0%, var(--main-gold) ${value}%, #fff ${value}%, white 100%)`
    }
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressVideo.style.flexBasis = `${percent}%`;
    videoTime.innerHTML = `0.${Math.floor(video.currentTime)} / 0. ${Math.floor(video.duration)}`;
    // slider.style.left = `${percent}%`;
}

function scrub(event) {
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    handleProgress();

}

function reloadVideo(e) {
    video.currentTime = 0;
    playVideo.style.display = 'block';
    toggleVideo.style.backgroundImage = 'url("./assets/svg/play.svg")';
    controls.style.position = 'absolute';
    playVideo.style.marginTop = '-65px';

}

function goFullScreen() {
    if (video.webkitSupportsFullscreen) {
        video.webkitEnterFullScreen();
    }
}

function showControls() {
    controls.style.position = 'relative';
}

function checkCurrentPlay() {
    if (video.paused) {
        playVideo.style.display = 'block';
        playVideo.style.marginTop = '-93px';
        toggleVideo.style.backgroundImage = 'url("./assets/svg/play.svg")';
    } else {
        playVideo.style.display = 'none';
        toggleVideo.style.backgroundImage = 'url("./assets/svg/pause.svg")';
    }

}

video.addEventListener('webkitfullscreenchange', checkCurrentPlay);
// video.addEventListener('click', switchPlay);
// video.addEventListener('click', e => !video.paused && switchPlay(e));
video.addEventListener('ended', reloadVideo);
video.addEventListener('change', handleProgress);
toggleVideo.addEventListener('click', switchPlay);
playVideo.addEventListener('click', switchPlay);
playVideo.addEventListener('click', showControls);
toggleVolume.addEventListener('click', switchVolume);
sliderVolume.addEventListener('input', changeInput);
controlFullScreen.addEventListener('click', goFullScreen);
progress.addEventListener('click', scrub)
progress.addEventListener('mousedown', () => mousedown = true);
document.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (event) => mousedown && scrub(event));