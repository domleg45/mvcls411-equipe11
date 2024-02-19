let currentSession;
let currentMediaSession;
let isPlaying = true;
let currentVideoIndex = 0;
let currentVideoUrl;
let updateInterval;

const lowVolBtn = document.getElementById('lowVolBtn');
const highVolBtn = document.getElementById('highVolBtn');
const muteBtn = document.getElementById('muteBtn');

const backBtn = document.getElementById('backBtn');
const pressBtn = document.getElementById('pressBtn');
const nextBtn = document.getElementById('nextBtn');

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

lowVolBtn.addEventListener('click', () => {
    
});

highVolBtn.addEventListener('click', () => {
    
});

muteBtn.addEventListener('click', () => {
    
});

backBtn.addEventListener('click', () => {
    
});
pressBtn.addEventListener('click', () => {
    
});

nextBtn.addEventListener('click', () => {
    
});