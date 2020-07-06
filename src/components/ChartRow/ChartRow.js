import React from 'react';
import {Link} from 'react-router-dom';
import "./ChartRow.css"

export default function ChartRow(props) {


// USE HOSTED LOGOS TO AVOID MISSING ASSETS
const BandcampLogo = "https://cdn.iconscout.com/icon/free/png-256/bandcamp-1-461777.png"
const IGLogo = "https://cdn.iconscout.com/icon/free/png-256/instagram-188-498425.png"
const TwitterLogo = "https://images.vexels.com/media/users/3/137419/isolated/preview/b1a3fab214230557053ed1c4bf17b46c-twitter-icon-logo-by-vexels.png"

const socials = () => {
    let socialsList = []
    for(let [socialPlatform, linkTo] of Object.entries(props.socials)) {
        let logo = (socialPlatform === "IG")? IGLogo
        : (socialPlatform === "Bandcamp")? BandcampLogo
        : (socialPlatform === "Twitter")? TwitterLogo
        : null

    socialsList.push(   
        <a href={linkTo}>
            <div className="social-icon-wrapper">
                <img src={logo}/>
            </div>
        </a>
        )
    }
    return socialsList
}

return (
    <>
    <div class="Rtable-cell Rtable-cell--head">
        <a href={props.linkToSpotify} target="_blank">
            {props.artistName}
        </a>
    </div>
        <div className="Rtable-cell">
            {props.popularity}
        </div>
        <div className="Rtable-cell">
            {props.genre}
        </div>
        <div className="Rtable-cell Rtable-cell--foot">
        <div className="socials-col">
            {socials()}
        </div>
    </div>
    </>
    )
}
