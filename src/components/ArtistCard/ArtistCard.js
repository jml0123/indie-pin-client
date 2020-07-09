import React, {Component} from 'react';

import "./ArtistCard.css"

export default class ArtistCard extends Component {
    
    componentDidMount() {
        const loadScript = (src) => {
            const tag = document.createElement('script');
            tag.src = src;
            tag.async = true;
        
            document.body.appendChild(tag);    
          }
        loadScript("https://use.fontawesome.com/8ee48a1bb5.js")
      
    }
    render(){
        const IGLogo = "https://cdn.iconscout.com/icon/free/png-256/instagram-188-498425.png"
        const SpotifyLogo = "https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png"
        const TwitterLogo = "https://images.vexels.com/media/users/3/137419/isolated/preview/b1a3fab214230557053ed1c4bf17b46c-twitter-icon-logo-by-vexels.png"
        
        // Spotify might not support bandcamp socials?
        const socials = () => {
            let socialsList = []
            console.log(this.props.data.socials)
            let socialsData = JSON.parse(this.props.data.socials)
            console.log(socialsData)
            for(let [socialPlatform, linkTo] of Object.entries(socialsData)) {
                let logo = (socialPlatform === "instagram")? IGLogo
                : (socialPlatform === "spotify")? SpotifyLogo
                : (socialPlatform === "spotify")? TwitterLogo
                : null
        
            socialsList.push(   
                <a href={linkTo} key={socialPlatform} target="_blank">
                    <div className="social-icon-wrapper">
                        <img src={logo}/>
                    </div>
                </a>
                )
            }
            return socialsList
        }

        return(
            <div className="artist-card">
                <div className="artist-popularity-container" style={{transform: `scale(${0.66  + this.props.data.popularity/133})`}}>
                    <i className="fa fa-caret-up" aria-hidden="true" />
                    <h1 className="level-label">Level</h1>
                    <h1>{this.props.data.popularity}</h1>
                </div>
                <div className="artist-card-header">
                    <div className="artist-img-wrapper">
                        <img src={this.props.data.image} alt={this.props.artistName + " spotify profile img"}/>
                    </div>
                    <div className="artist-locale-container">
                        <h1>{this.props.data.neighborhood}</h1>
                    </div>
                    <h1 className="artist-name">{this.props.data.artistName}</h1>
                    <h2 className="artist-genre">Genre: {this.props.data.genre}</h2>
                    <div className="socials-col">
                        {socials()}
                    </div>
                </div>
            </div>
        )
    }
}