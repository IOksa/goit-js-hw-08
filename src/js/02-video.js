import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
console.log("iframe=", iframe);
const player = new Vimeo.Player(iframe);
console.log("player=", player);
const objPlayer={
    'videoplayer-current-time': 0,
};

player.on('play', function() {
    console.log('played the video!');
});

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});


const onPlay = function(data) {
    // data is an object containing properties specific to that event
    objPlayer['videoplayer-current-time']=data;
    console.log("objPlayer['videoplayer-current-time']=", objPlayer['videoplayer-current-time']);
};

player.on('timeupdate', onPlay);



player.setCurrentTime(30.456).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});