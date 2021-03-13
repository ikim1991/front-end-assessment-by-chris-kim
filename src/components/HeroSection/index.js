import React, { useEffect, useState } from 'react';
import './css/index.css';
import two from './images/earth.jpg';
import three from './images/space.jpg';
import one from './images/yyz.jpg';

const HeroSection = () => {

    // State Change required for Rerendering with new Slide
    const [slide, changeSlide] = useState(0)
    // Inject Images for Bundling
    const images = [one, two, three]

    // Navigate Slides by Clicking on Circle
    const onClickDot = (e) => {
        const index = +e.target.getAttribute("data-key")

        changeSlide(index)
    }

    // On Hover Menu Bar, Display Navigation Links
    const onMenuEnter = (e) => {
        const el = document.querySelector('.bars-background')
        const hoverEl = document.querySelector('.bars-background-hover')
        
        el.style.display = 'none'
        hoverEl.style.display = 'flex'

    }

    // On Hover Out of Menu Bar, Display Menu Bar
    const onMenuExit = (e) => {
        const el = document.querySelector('.bars-background')
        const hoverEl = document.querySelector('.bars-background-hover')
        
        el.style.display = 'flex'
        hoverEl.style.display = 'none'
    }

    useEffect(() => {

        // Logic for Handling Timed Navigation
        const changeOnTimer = () => {
            let count = slide + 1
            if(count > 2){
                changeSlide(0)
            }else{
                changeSlide(count)
            }
        }

        // Change Slide every 10 Seconds
        const intervalId = setInterval(changeOnTimer, 10000)

        // Clean up
        return () => clearInterval(intervalId)

    })

    return(
        <div className="heroSection">
            {/* Display Image based on the Current state */}
            {images.filter((image, index) => slide === index).map((image, ind) => <img className="heroSection-image image-animation" src={image} key={image} alt="Hero Section"/>)}
            <div className="dots">
                {/* Navigation Circles Rendered based on number of Images. Highlight current selection */}
                {images.map((image, ind) => {
                    if(ind === slide){
                        return <span className="dot highlighted" key={ind} data-key={ind}></span>
                    }
                    return <span className="dot" key={ind} data-key={ind} onClick={onClickDot}></span>
                })}
            </div>
            {/* Button Navigating to Pricing Page */}
            <a className="heroSection-button" href="#/pricing" key={Math.random()}>See Pricing</a>
            {/* Different Backgrounds for Menu Navigation triggered by Hovering in and out */}
            <div className="bars-background" onMouseEnter={onMenuEnter}>
                <i className="fa fa-bars bars"></i>
            </div>
            <div className="bars-background-hover" onMouseLeave={onMenuExit}>
                <p>ITEM 1</p>
                <p>ITEM 2</p>
                <p>ITEM 3</p>
                <p>ITEM 4</p>
            </div>
        </div>
    )

}

export default HeroSection
