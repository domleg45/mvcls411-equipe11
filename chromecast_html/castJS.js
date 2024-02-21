let currentSession;
let currentMediaSession;
let isPlaying = true;
let isMute = false;
let currentVolume = 0.5;
let currentVideoIndex = 0;
let currentVideoUrl;
let updateInterval;
const defaultContentType = 'video/mp4';
const applicationID = '3DDC41A0';
const videoList = [
    'https://transfertco.ca/video/DBillPrelude.mp4',
    'https://transfertco.ca/video/DBillSpotted.mp4',
    'https://transfertco.ca/video/usa23_7_02.mp4'
];

const lowVolBtn = document.getElementById('lowVolBtn');
const highVolBtn = document.getElementById('highVolBtn');
const muteBtn = document.getElementById('muteBtn');

const backBtn = document.getElementById('backBtn');
const pressBtn = document.getElementById('pressBtn');
const nextBtn = document.getElementById('nextBtn');

const connectBtn = document.getElementById('connectButton');
const startBtn = document.getElementById('startButton');

const muteIcon = document.getElementById('muteIcon');
const pressIcon = document.getElementById('pressIcon')

connectBtn.addEventListener('click', () => {
    initializeApiOnly();
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
    console.error('Chromecast initialization error', error);
}

function onMediaCommandSuccess() {
    console.log('Media command success');
}

//Initiates the variables when connected
function loadMedia(videoUrl) {
    currentVideoUrl = videoUrl;
    const mediaInfo = new chrome.cast.media.MediaInfo(videoUrl, defaultContentType);
    const request = new chrome.cast.media.LoadRequest(mediaInfo);
    const remotePlayer = new cast.framework.RemotePlayer();
    const remotePlayerController = new cast.framework.RemotePlayerController(remotePlayer);

    currentSession.loadMedia(request, mediaSession => {
        console.log('Media chargé avec succès');
        initializeSeekSlider(remotePlayerController, mediaSession);
      }, onError);
}

function changeVolume(currentMediaSession) {
    const volume = new chrome.cast.Volume(currentVolume, false);
    const volumeRequest = new chrome.cast.media.VolumeRequest(volume);
    currentMediaSession.setVolume(volumeRequest, onMediaCommandSuccess, onError)
}

lowVolBtn.addEventListener('click', () => {
    currentVolume --;
    changeVolume(currentMediaSession);
});

highVolBtn.addEventListener('click', () => {
    currentVolume ++;
    changeVolume(currentMediaSession);
});

muteBtn.addEventListener('click', () => {
    if (currentMediaSession.volume.muted) {
        const volume = new chrome.cast.Volume(lastVolumeLevel, false);
        const volumeRequest = new chrome.cast.media.VolumeRequest(volume);
        currentMediaSession.setVolume(volumeRequest, onMediaCommandSuccess, onError);
        muteIcon.className = "bi bi-volume-mute-fill";
    } else {
        const volume = new chrome.cast.Volume(0, true);
        const volumeRequest = new chrome.cast.media.VolumeRequest(volume);
        currentMediaSession.setVolume(volumeRequest, onMediaCommandSuccess, onError);
        muteIcon.className = "bi bi-volume-off-fill";
    }
});

backBtn.addEventListener('click', () => {
    if (currentSession) {
        if(currentVideoIndex == 0){
            currentVideoIndex = videoList.length - 1;
            loadMedia(videoList[currentVideoIndex]);
        }
        else{
            loadMedia(videoList[currentVideoIndex - 1]);
        }
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

pressBtn.addEventListener('click', () => {
    if (currentMediaSession) {
        if (isPlaying) {
            currentMediaSession.pause(null, onMediaCommandSuccess, onError);
            pressIcon.className = "bi bi-play-fill";
        } else {
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