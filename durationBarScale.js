'use strict';

let defScale, defRatio = 0.01, curRatio = 0, playbackState, oldTime = 0, newTime = 0;
const updateMult = 0.5; //how smooth bar updates, 1.0 = updates each second, 0.1 = updates each .1 of a second
//though smaller the number the less accurate it gets, wouldn't recommend going lower than 0.5, 1.0 is pretty much 100% accurate

export function update(value) {
    newTime = Date.now();
    if (playbackState == MediaPlaybackEvent.PLAYBACK_PLAYING && newTime - oldTime >= 1000*updateMult)
    {
        curRatio += defRatio*updateMult;
        value.x = defScale.x*curRatio;
        oldTime = newTime;
    }
    return value;
}

export function init(value) {
    defScale = value;
    oldTime = Date.now();
    playbackState = MediaPlaybackEvent.PLAYBACK_STOPPED;
    return value;
}

export function mediaTimelineChanged(event) {
    defRatio = 1/event.duration;
    curRatio = event.position/event.duration;
}

export function mediaPlaybackChanged(event) {
    playbackState = event.state;
}