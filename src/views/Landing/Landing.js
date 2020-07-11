
import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../AuthContext';
import "./Landing.css"
import '../../styles/terminal.scss';

export default function LandingPage() {
    const auth = useContext(AuthContext)
    const cta = (auth.token)? 
    <Link to="/map"><button className="btn--go">Explore The World</button></Link> 
    :  
    <div className="cta-wrapper">
        <div
        className="btn btn--loginApp-link"
        onClick={e => auth.spotifyLogin("")}
        >
            <img className="spotify-logo" src={auth.icon} alt="Spotify Logo"/> Login with Spotify
        </div>
        <p>Or try a <Link to="/map"><span>demo</span></Link> with limited features</p>
    </div>
    
    return (
        <div className="container">
        <div className="splash-page screen">
        <div className="splash-content-wrapper">
            <div className="splash-header-container">
                <h1>Indie Pin</h1>
                <p>Put yourself or your favorite artists on the map</p>
            </div>
            <div className="btn-wrapper">
                {cta}
            </div>
        </div>
        </div>
        </div>
    )
}