import React from 'react';
import {Link} from 'react-router-dom';

import "./Landing.css"

export default function LandingPage() {
    return (
        <>
        <div class="splash-page">
        <div class="splash-content-wrapper">
            <div class="splash-header-container">
                <h1>Indie Pin</h1>
                <p>Put yourself or your favorite artists on the map</p>
            </div>
            <div class="btn-wrapper">
                <Link to="/map"><button>Get Started</button></Link>
            </div>
        </div>
        </div>
        </>
    )
}