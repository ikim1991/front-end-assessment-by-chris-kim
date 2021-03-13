import React, { useEffect, useState } from 'react';
import './css/index.css';
import song from './audio/champs.mp3'

const Red = () => {

    const [isPlaying, changeState] = useState(false)

    useEffect(() => {
        // Create audio Element
        let audioCtx = new AudioContext()
        let audioEl = document.getElementById('audio').appendChild(document.createElement('audio'))
        audioEl.src = song

        // Get the audio element
        const audioElement = document.querySelector('audio');

        // Pass it into the audio context
        const track = audioCtx.createMediaElementSource(audioElement);
        track.connect(audioCtx.destination);

        const playButton = document.querySelector('#audio-button');

        const playSong = () => {
            // Check if context is in suspended state (autoplay policy)
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
        
            // If Paused, Play. If Playing, Pause
            if (playButton.dataset.playing === 'false') {
                audioElement.play();
                playButton.dataset.playing = 'true';

                // Change Play/Pause Icon Depending on State
                changeState(true)

            } else if (playButton.dataset.playing === 'true') {
                audioElement.pause();
                playButton.dataset.playing = 'false';

                // Change Play/Pause Icon Depending on State
                changeState(false)
            }
        }

        playButton.addEventListener('click', playSong, false);

        // Clean Up
        return () => playButton.removeEventListener('click', playSong)

    }, [])

    return(
        <div className="red">
            <div id="audio">
            </div>
            <div id="audio-button" data-playing="false" role="switch" aria-checked="false">
                {(isPlaying) ? (
                    <i className="fa fa-volume-up play"></i>
                ) : (
                    <i className="fa fa-pause pause"></i>
                )}
            </div>
            
        </div>
    )

}

export default Red
