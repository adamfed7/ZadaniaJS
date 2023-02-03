document.addEventListener('keypress', onKeyPress);
var track = [];
var tracks = [
    track,
    track,
    track,
    track
]

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

function recording(n) {
    let previousTimestamp;
    document.addEventListener('keypress', event => {
    const sound = KeyToSound[event.key];
    const timestamp = new Date();
    const timeDiff = previousTimestamp ? timestamp - previousTimestamp : 0;

    sound.play();

    tracks[n].push({
        sound,
        timeDiff
    });

    previousTimestamp = timestamp;

    });
};

function recordTrack(n) {
    var img = document.getElementById('record' + n);

    if (img.style.background == "red") {
        img.style.background = "beige";
        
        console.log(tracks[n]);
        
    } else {
        img.style.background = "red";
        if(tracks[n].length > 0){
            tracks[n].splice(0, track.length);
        }

        document.addEventListener('keypress', recording(n));
    }
}
const playSounds = async (track) => {
    for (const {
            sound,
            timeDiff
        } of track) {
        await new Promise(resolve => setTimeout(resolve, timeDiff));
        sound.play();
    }
};