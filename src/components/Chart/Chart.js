import React, {Component} from 'react';
import "./Chart.css"
import ChartRow from "../ChartRow/ChartRow"

export default class Chart extends Component {
    // Add reverse geocoded neighborhood endpoints on serverside
    // Make an API call here to get top artists based on popularity and endorsements
    state = {
        artists: [
            { 
                artistName:  "George Cloonly",
                genre: "Surf hop",
                popularity: 88,
                linkToSpotify: "https://spotify.com",
                socials: {
                    IG: "https://instagram.com",
                    Twitter: "https://twitter.com"
                }
            },
            { 
                artistName:  "Delroy Edwards",
                genre: "Techno",
                popularity: 55,
                linkToSpotify: "https://spotify.com",
                socials: {
                    IG: "https://instagram.com",
                    Bandcamp: "https://bandcamp.com",
                }
            },
        ]
    }
    render() {
        const chartRows = this.state.artists.map(artist => {
            return <ChartRow   
                artistName = {artist.artistName}
                genre = {artist.genre}
                popularity = {artist.popularity}
                linkToSpotify = {artist.linkToSpotify}
                socials = {artist.socials}
            />
        })
        return (
            <div className="Rtable Rtable--4cols Rtable--collapse top-artists-table">
                <div className="Rtable-cell t-heading">Name</div>
                <div className="Rtable-cell t-heading">Popularity</div>
                <div className="Rtable-cell t-heading">Genre</div>
                <div className="Rtable-cell t-heading">Links</div>
                {chartRows}
            </div>   
        )
    }
}


