import React, { useEffect, useState } from 'react';
import './css/index.css';
import song from './audio/champs.mp3'
import dybala from './images/dybala.jpg';
import bukayo from './images/bukayo.jpg';
import torres from './images/torres.jpg';
import pog from './images/pog.jpg';
import sonny from './images/sonny.jpg';
import drogba from './images/drogba.jpg'

const Red = () => {

    // Change Play/Pause Status of Audio
    const [isPlaying, changeState] = useState(false)
    // State to track Navigation
    const [slide, changeSlide] = useState(0)
    // Inject Images for Bundling
    const images = [dybala, torres, sonny, bukayo, pog, drogba]


    // Render Interactive Custom Cursor
    useEffect(() => {

        const cursor = document.querySelector('.cursor')
        const cursorDelay = document.querySelector('.cursor-delay')

        const editCursor = (e) => {
            
            // Set Coordinates of Mouse Pointer to Follow
            cursor.style.left = e.clientX + 'px'
            cursor.style.top = e.clientY + 'px'
            cursorDelay.style.left = e.clientX + 'px'
            cursorDelay.style.top = e.clientY + 'px'
        }

        // Emits anytime mouse is moved
        document.addEventListener('mousemove', editCursor)

        // Clean up
        return () => document.removeEventListener('mousemove', editCursor)

    }, [])

    useEffect(() => {
        // Create audio Element
        let audioCtx = new AudioContext()
        let audioEl = document.getElementById('audio').appendChild(document.createElement('audio'))
        audioEl.src = song
        audioEl.loop = true

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

        // Clean up
        return () => {
            playButton.removeEventListener('click', playSong)
            audioEl.remove()
        }
    }, [])

    useEffect(() => {
        // Logic for Handling Timed Navigation
        const changeOnTimer = () => {
            let count = slide + 1
            if(count > 5){
                changeSlide(0)
            }else{
                changeSlide(count)
            }
        }

        // Change Slide every 3 Seconds
        const intervalId = setInterval(changeOnTimer, 4000)

        return () => clearInterval(intervalId)
    }, [slide])

    return(
        <div className="red">
            {images.filter((image, index) => slide === index).map((image, ind) => {

                if(slide % 2 === 0){
                    return <img className="red-image-even" src={image} key={Math.random()} alt="Footy"/>
                } else{
                    return <img className="red-image-odd" src={image} key={Math.random()} alt="Footy"/>
                }
            })}
            <div id="audio">
            </div>
            <div id="audio-button" data-playing="false" role="switch" aria-checked="false">
                {(isPlaying) ? (
                    <i className="fa fa-volume-up play"></i>
                ) : (
                    <i className="fa fa-pause pause"></i>
                )}
            </div>
            <div className="red-buttons">
                <a className="try-it-now red-button" href="#/pricing">Try It Now</a>
                <div className="see-demo red-button">See Demo</div>
            </div>
            <div className="cursor"></div>
            <div className="cursor-delay"></div>
        </div>
    )

}

export default Red
