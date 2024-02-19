let currentSession;
let currentMediaSession;
let isPlaying = true;
let currentVideoIndex = 0;
let currentVideoUrl;
let updateInterval;

const volumeBtn = document.getElementById('volumeBtn');
const upBtn = document.getElementById('upBtn');
const muteBtn = document.getElementById('muteBtn');
const leftBtn = document.getElementById('leftBtn');
const pressBtn = document.getElementById('pressBtn');
const rightBtn = document.getElementById('rightBtn');
const backBtn = document.getElementById('backBtn');
const downBtn = document.getElementById('downBtn');
const homeBtn = document.getElementById('homeBtn');

document.getElementById('connectButton').addEventListener('click', () => {
    initializeApiOnly();
});

function receiverListener(availability) {
    if (availability === chrome.cast.ReceiverAvailability.AVAILABLE) {
        document.getElementById('connectButton').style.display = 'block';
    } else {
        document.getElementById('connectButton').style.display = 'none';
    }
}

function initializeApiOnly() {
    
    const sessionRequest = new chrome.cast.SessionRequest(applicationID);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

volumeBtn.addEventListener('click', () => {
    
});

upBtn.addEventListener('click', () => {
    
});

muteBtn.addEventListener('click', () => {
    
});

leftBtn.addEventListener('click', () => {
    
});

pressBtn.addEventListener('click', () => {
    
});

rightBtn.addEventListener('click', () => {
    
});

backBtn.addEventListener('click', () => {
    
});

downBtn.addEventListener('click', () => {
    
});

homeBtn.addEventListener('click', () => {
    
});