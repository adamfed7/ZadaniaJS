document.addEventListener('keypress', onKeyPress);
const tracks = [
    [],
    [],
    [],
    []
]
var k = 0;
let previousTimestamp;

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

function recordTrack(n) {
    var img = document.getElementById('record' + n);
    k = n;
    if (img.style.background === "red") {
        img.style.background = "beige";
        document.removeEventListener('keypress', recording, true);
        previousTimestamp = 0;
        console.log(tracks[n]);

    } else {
        img.style.background = "red";
        document.addEventListener('keypress', recording, true);
    }

}

function recording(event) {

    const sound = KeyToSound[event.key];
    const timestamp = new Date();
    const timeDiff = previousTimestamp ? timestamp - previousTimestamp : 0;

    tracks[k].push({
        sound,
        timeDiff
    });

    previousTimestamp = timestamp;;
};

const playSounds = async (track) => {
    for (const {
            sound,
            timeDiff
        } of track) {
        await new Promise(resolve => setTimeout(resolve, timeDiff));
        sound.play();
    }
};

async function playSoundsAsync() {
    playSounds(tracks[0]);
    playSounds(tracks[1]);
    playSounds(tracks[2]);
    playSounds(tracks[3]);
}