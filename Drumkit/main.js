document.addEventListener('keypress', onKeyPress);
var playButton = true;


const KeyToSound = {
    'a': document.querySelector('#s1'),
    's': document.querySelector('#s2'),
    'd': document.querySelector('#s3'),
    'f': document.querySelector('#s4'),
    'g': document.querySelector('#s5'),
    'h': document.querySelector('#s6'),
    'j': document.querySelector('#s7'),
    'k': document.querySelector('#s8'),
    'l': document.querySelector('#s9')
}

function onKeyPress(event) {
    const sound = KeyToSound[event.key];
    playSound(sound);
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}
const pressedKeys = [];
let lastPressTime;

function start(trackNumber) {
    
    if (playButton) {
        playButton = false;
        document.querySelector(".imagePlay" + trackNumber).setAttribute("src", "img/play.png");
        showKeys();
        stopRecording();

    } else {
        playButton = true;
        document.querySelector(".imagePlay" + trackNumber).setAttribute("src", "img/pause.png");
        startRecording();

        document.addEventListener('keypress', event => {
            const currentTime = performance.now();
            let timeBetweenPresses = 0;
          
            if (lastPressTime) {
              timeBetweenPresses = currentTime - lastPressTime;
            }
          
            pressedKeys.push({
              code: event.code,
              time: timeBetweenPresses,
            });
          
            lastPressTime = currentTime;
          });
        
    }
}


function showKeys(){
    console.log(pressedKeys);
}
let mediaRecorder;
let audioChunks = [];

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });
      mediaRecorder.start();
    });
}

function stopRecording() {
    if(mediaRecorder) {
        mediaRecorder.stop();
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio("sounds/audio.mp3");
        audio.play();
    }
}

function playRecording() {
    if(audioChunks.length > 0) {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio("sounds/audio.mp3");
        audio.play();
    }
}
