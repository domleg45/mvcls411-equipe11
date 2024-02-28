let currentSession;
let currentMediaSession;
let isPlaying = true;
let isMute = false;
let currentVolume = 0.5;
let currentVideoIndex = 0;
let currentVideoUrl;
let updateInterval;
let lastVolumeLevel = 1.0;
const seekSlider = document.getElementById('seekSlider');
const currentTimeElement = document.getElementById('currentTime');
const totalTimeElement = document.getElementById('totalTime');
const defaultContentType = 'video/mp4';
const applicationID = '3DDC41A0';
const videoList = [
    'https://transfertco.ca/video/DBillPrelude.mp4',
    'https://transfertco.ca/video/DBillSpotted.mp4',
    'https://transfertco.ca/video/usa23_7_02.mp4'
];

const lowVolBtn = document.getElementById('lowVolBtn');
const highVolBtn = document.getElementById('HighVolBtn');
const muteBtn = document.getElementById('muteBtn');

const backBtn = document.getElementById('backBtn');
const pressBtn = document.getElementById('pressBtn');
const nextBtn = document.getElementById('nextBtn');

const skipBtn = document.getElementById("skipBtn");
const backwardBtn = document.getElementById("backwardBtn")

const connectBtn = document.getElementById('connectButton');
const disconnectBtn = document.getElementById('disconnectBtn')
const startBtn = document.getElementById('startButton');
const pressIcon = document.getElementById('pressIcon');
const muteText = document.getElementById('muteText');
const pressText = document.getElementById('pressText');

connectBtn.addEventListener('click', () => {
    initializeApiOnly();
});

function onCorrectLeave() {
    console.log('Disconnected')
}

function onWrongLeave(error) {
    console.error('Chromecast disconnection error', error)
}

disconnectBtn.addEventListener('click', () => {
    if(currentSession) {
        currentSession.leave(onCorrectLeave, onWrongLeave);
    } else {
        alert("Vous n'êtes pas connecté")
    }
});

startBtn.addEventListener('click', () => {
    if (currentSession) {
        loadMedia(videoList[currentVideoIndex]);
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

function initializeApiOnly() {
    
    const sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

function sessionListener(newSession) {
    currentSession = newSession;
}

function receiverListener(availability) {
    if (availability === chrome.cast.ReceiverAvailability.AVAILABLE) {
        connectBtn.style.display = 'block';
    } else {
        connectBtn.style.display = 'none';
    }
}

function onInitSuccess() {
    console.log('Chromecast init success');
}

function onError(error) {
    console.error('Chromecast initialization error', error)
}

function onMediaCommandSuccess() {
    console.log('Media command success');
}

function initializeMediaAndSlider(mediaSession) {
    currentMediaSession = mediaSession;
    document.getElementById('playBtn').style.display = 'block';
   // Set max value of seek slider to media duration in seconds
   seekSlider.max = mediaSession.media.duration;

    // Update seek slider and time elements on time update
    updateInterval = setInterval(() => {
        const currentTime = mediaSession.getEstimatedTime();
        const totalTime = mediaSession.media.duration;
  
        seekSlider.value = currentTime;
        currentTimeElement.textContent = formatTime(currentTime);
        totalTimeElement.textContent = formatTime(totalTime);
      }, 1000); //chaque 1000 ms... 1 sec
  
      // slider change
      seekSlider.addEventListener('input', () => {
        const seekTime = parseFloat(seekSlider.value);
        remotePlayerController.seek(seekTime);
      });
 }

skipBtn.addEventListener('click', () => {
    const currentTime = mediaSession.getEstimatedTime();
    if(currentTime >= mediaSession.media.duration - 10){
        remotePlayerController.seek(mediaSession.media.duration);
        currentTime = mediaSession.media.duration;
    }
    else{
        remotePlayerController.seek(currentTime + 10);
        currentTime += 10;
    }
});

backwardBtn.addEventListener('click', () => {
    const currentTime = mediaSession.getEstimatedTime();
    if(currentTime <= 10){
        remotePlayerController.seek(0);
        currentTime = 0;
    }
    else{
        remotePlayerController.seek(currentTime - 10);
        currentTime -= 10;
    }
})

//Initiates the variables when connected
function loadMedia(videoUrl) {
    currentVideoUrl = videoUrl;
    const mediaInfo = new chrome.cast.media.MediaInfo(videoUrl, defaultContentType);
    const request = new chrome.cast.media.LoadRequest(mediaInfo);

    currentSession.loadMedia(request, mediaSession => {
        console.log('Media chargé avec succès');
        initializeMediaAndSlider(mediaSession);
      }, onError);
}

function changeVolume(currentMediaSession) {
    const volume = new chrome.cast.Volume(currentVolume, false);
    const volumeRequest = new chrome.cast.media.VolumeRequest(volume);
    currentMediaSession.setVolume(volumeRequest, onMediaCommandSuccess, onError)
}

lowVolBtn.addEventListener('click', () => {
    if(currentVolume != 0){
    currentVolume = currentVolume - 0.1;
    changeVolume(currentMediaSession);
    }
});

highVolBtn.addEventListener('click', () => {
    if(currentVolume !=1){
    currentVolume = currentVolume + 0.1;
    changeVolume(currentMediaSession);
    }
});

muteBtn.addEventListener('click', () => {
    if (currentMediaSession.volume.muted) {
        muteText.textContent = "Mute";
        const volume = new chrome.cast.Volume(lastVolumeLevel, false);
        const volumeRequest = new chrome.cast.media.VolumeRequest(volume);
        currentMediaSession.setVolume(volumeRequest, onMediaCommandSuccess, onError);
        muteIcon.className = "bi bi-volume-mute-fill";
    } else {
        muteText.textContent = "Unmute";
        const volume = new chrome.cast.Volume(0, true);
        const volumeRequest = new chrome.cast.media.VolumeRequest(volume);
        currentMediaSession.setVolume(volumeRequest, onMediaCommandSuccess, onError);
        muteIcon.className = "bi bi-volume-off-fill";
    }
});

backBtn.addEventListener('click', () => {
    if (currentSession) {
        if(currentVideoIndex == 0){
            currentVideoIndex = videoList.length;
        }
        loadMedia(videoList[currentVideoIndex - 1]);
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

pressBtn.addEventListener('click', () => {
    if (currentMediaSession) {
        if (isPlaying) {
            pressText.textContent = "Play";
            currentMediaSession.pause(null, onMediaCommandSuccess, onError);
            pressIcon.className = "bi bi-play-fill";
        } else {
            pressText.textContent = "Pause";
            currentMediaSession.play(null, onMediaCommandSuccess, onError);
            pressIcon.className = "bi bi-pause-fill";
        }
        isPlaying = !isPlaying;
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSession) {
        currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
        loadMedia(videoList[currentVideoIndex]);
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});