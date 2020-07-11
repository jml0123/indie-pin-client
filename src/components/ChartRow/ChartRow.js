import React from 'react';
import {Link} from 'react-router-dom';
import ArtistCard from '../ArtistCard/ArtistCard';
import "./ChartRow.css"

export default function ChartRow(props) {


// USE HOSTED LOGOS TO AVOID MISSING ASSETS
const SpotifyLogo = "https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png"
const IGLogo = "https://cdn.iconscout.com/icon/free/png-256/instagram-188-498425.png"
const TwitterLogo = "https://images.vexels.com/media/users/3/137419/isolated/preview/b1a3fab214230557053ed1c4bf17b46c-twitter-icon-logo-by-vexels.png"

const socials = () => {
    let socialsList = []
    let socialsData = (props.social_links)

    for(let entry of socialsData) {
        let logo = (entry.includes("instagram"))? IGLogo
        : (entry.includes("spotify"))? SpotifyLogo
        : (entry.includes("twitter"))? TwitterLogo
        : null

    socialsList.push(   
        <a href={entry} key={entry} target="_blank">
            <div className="social-icon-wrapper">
                <img src={logo}/>
            </div>
        </a>
        )
    }
    return socialsList
}

return (
    <div className="chart-row">
    <div className="Rtable-cell Rtable-cell--head">
        <a href={props.link_to_spotify} target="_blank" className="main-info--link">
            <img src={props.profile_img} alt={props.artist_name} className="chart-img"/>
            <p>{props.artist_name}</p>
        </a>
    </div>
        <div className="Rtable-cell">
            {props.popularity}
        </div>
        <div className="Rtable-cell genre-cell">
            {(props.genres[0]) ? props.genres[0] : "Uncategorized"}
        </div>
        <div className="Rtable-cell Rtable-cell--foot">
        <div className="socials-col">
            {socials()}
        </div>
    </div>
    </div>
    )
}
