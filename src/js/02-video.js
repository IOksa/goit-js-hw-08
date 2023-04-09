import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');

const player = new Player(iframe);

const onPlay = function(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
player.on('timeupdate', throttle(onPlay,1000));

player.setCurrentTime(JSON.parse(localStorage.getItem(STORAGE_KEY)).seconds).then(function(seconds) {
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