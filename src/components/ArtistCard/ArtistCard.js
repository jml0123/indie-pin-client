import React, {Component} from 'react';

import "./ArtistCard.css"

export default class ArtistCard extends Component {
    
    componentDidMount() {
        console.log(this.props)
        const loadScript = (src) => {
            const tag = document.createElement('script');
            tag.src = src;
            tag.async = true;
        
            document.body.appendChild(tag);    
          }
        loadScript("https://use.fontawesome.com/8ee48a1bb5.js")
      
    }

    stringifyArray = (s) => {
        return s.substr(1, s.length-2).split(/\s*,\s*/);
    }
    render(){
        const IGLogo = "https://cdn.iconscout.com/icon/free/png-256/instagram-188-498425.png"
        const SpotifyLogo = "https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png"
        const TwitterLogo = "https://images.vexels.com/media/users/3/137419/isolated/preview/b1a3fab214230557053ed1c4bf17b46c-twitter-icon-logo-by-vexels.png"
        
        // Spotify might not support bandcamp socials?
        // Create reusablehelper function (uses this on chart row too)
        const socials = () => {
            let socialsList = []
            let data = (this.props.data.social_links)
            const socialsData = this.stringifyArray(data)

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
        const genre = this.stringifyArray(this.props.data.genres).map(el => {
            return el.replace(/^"(.*)"$/, '$1')
        });
        console.log(genre)
        const displayedGenre = (genre[0]) ? genre[0] : "Uncategorized"
        
        return(
            <div className="artist-card">
                <div className="artist-popularity-container" style={{transform: `scale(${0.66  + this.props.data.popularity/133})`}}>
                    <i className="fa fa-caret-up" aria-hidden="true" />
                    <h1 className="level-label">Level</h1>
                    <h1>{this.props.data.popularity}</h1>
                </div>
                <div className="artist-card-header">
                    <div className="artist-img-wrapper">
                        <img src={this.props.data.profile_img} alt={this.props.artist_name + " spotify profile img"}/>
                    </div>
                    <div className="artist-locale-container">
                        <h1>{this.props.data.neighborhood}</h1>
                    </div>
                    <h1 className="artist-name">{this.props.data.artist_name}</h1>
                    <h2 className="artist-genre">Type: {displayedGenre}</h2>
                    <div className="socials-col">
                        {socials()}
                    </div>
                </div>
            </div>
        )
    }
}