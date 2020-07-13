import React, {useEffect} from 'react';
import TutorialGif from "../../assets/indiepin_tutorial.gif";

import './PopUp.css';

export default function PopUp(props) {

    useEffect(() => {
         // make this a util function
         const loadScript = (src) => {
            const tag = document.createElement('script');
            tag.src = src;
            tag.async = true;
        
            document.body.appendChild(tag);    
        }
        loadScript("https://use.fontawesome.com/8ee48a1bb5.js")
      });

    return (
    <div className="popup-content-wrapper">
        <div className="popup-content">
            <div className="popup-heading-container">
                <h1>Running Indie Pin Version {props.version}</h1>
                <i onClick = {() => props.closeWindow()} className="fa fa-times" aria-hidden="true" id="popup-close-btn"></i>
            </div>
            <div className="popup-description-container">
                <p>Indie Pin is a live heatmap of artists around the globe.</p>
                <p>Dive into the world and to get a sense of the culture around the area, or
                    pin your favorite artist to their point of origin.
                </p>
                <div className="popup-img-container">
                    <img src={TutorialGif} alt="indie-pin-tutorial"/>
                </div>
                <p>
                    The heatmap represents a group of artists in a given location. 
                    <span> Hover </span>over a circle to view an aritst.
                    <span> Click </span>on an area to pin an artist and see the heatmap intensify. 
                    Use an artist's <span>Spotify URL</span> to add them to the map. Explore the world and happy hunting!
                </p>
            </div>
        </div>
    </div>
)}

