import React from 'react';
import Nav from '../../components/Nav/Nav';

import "./About.css"


export default function AboutPage() {
    return (
        <div className="about-page">
            <Nav/>
            <div className="about-content-wrapper">
            <div className="about-info-container">
                <h1>About</h1>
                <div className="about-img-wrapper">
                    <img src="https://avatars.dicebear.com/api/human/brosef221ap%3Bfd%2Cvmcxzssawq.svg?r=50&m=10&b=%2300ccff&mood[]=surprised"/>
                </div>
            </div>
            <div className="about-description-wrapper">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum 
                </p>
            </div>
            </div>
        </div>
    )
}