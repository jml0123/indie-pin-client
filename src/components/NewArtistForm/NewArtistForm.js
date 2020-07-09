import React, {Component} from 'react';
import "./NewArtistForm.css"

export default class NewArtistForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            artist: null,
            coordinates: this.props.coordinates,
            error: null,
            result: null
        }
    }
   

    componentDidMount() {
        const loadScript = (src) => {
            const tag = document.createElement('script');
            tag.src = src;
            tag.async = true;
        
            document.body.appendChild(tag);    
          }
        loadScript("https://use.fontawesome.com/8ee48a1bb5.js")
      
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const artistData = this.state.artist
        const genre = (artistData.genres[0]) ? artistData.genres[0] : "uncategorized"
        const artistImage = (artistData.images[0]) ? artistData.images[0].url : "https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg"
        const serializedArtistData = {
            "type":"Feature",
            "properties": {
                "popularity": artistData.popularity,
                 "artistName": artistData.name,
                 "genre": genre,
                 "image": artistImage,
                 "linkToSpotify": artistData.external_urls.spotify,
                 "neighborhood": "Placeholder, calculate locale on server",
                 "socials": artistData.external_urls
            },
            "geometry":{
                "type":"Point",
                "coordinates": this.state.coordinates
            }
          }
        // Add POST call here to API
        // Then set state afterwards...
        this.setState({
            ...this.state,
            result: `Successfully added ${artistData.name}!`
        })
        this.props.addArtist(serializedArtistData)
    }

    setArtistData(artistData) {
        this.setState({
            ...this.state,
            artist: artistData
        })
        console.log(this.state)
    }
    handleArtistLookup(e) {
        // IMPLEMENT SERVER SIDE AUTH FLOW!!! OR A DIFFERENT ONE USING IMPLICIT GRANT
        const parseUrl = e.target.value.split("/")
        const artistId = parseUrl[parseUrl.length - 1]
        const SPOTIFY_API = "https://api.spotify.com/v1"
        
        fetch(
            `${SPOTIFY_API}/artists/${artistId}`, 
            {
            headers: new Headers({
                Authorization: `Bearer ${this.props.auth.token}`
                })
            })
            .then(res => res.json()
                .then(data => {
                    console.log(data)
                    this.setArtistData(data)
                })
            )
            .catch(error =>{
                this.setState({
                    ...this.state,
                    error: error
                })
            })
    }
    //consider adding heat.wav icon for level placeholder
    render(){
        const artistInfo =  (!this.state.artist)? null :
        <div className="artist-form-header">
            <div className="artist-img-wrapper--form">
                <img src={(!this.state.artist.images[0].url) ? "https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg" : this.state.artist.images[0].url } alt={this.state.artist.name + " spotify profile img"}/>
            </div>
            <h1 className="artist-name">{this.state.artist.name}</h1>
            <h2 className="artist-genre">Genre: {this.state.artist.genres[0]}</h2>
        </div>

        const artistLevel = (!this.state.artist)? null :
        <div className="artist-popularity-container">
            <i className="fa fa-caret-up" aria-hidden="true" />
            <h1 className="level-label">
                Level
            </h1>
            <h1>{this.state.artist.popularity}</h1>
        </div>


        const newArtistForm = 
        <>
        <i className="fa fa-map-pin" aria-hidden="true"/>
            <label htmlFor="spotify-artist-link">Pin an artist using their Spotify URL</label>
            <input type="text" id="spotify-artist-link" onChange={e => this.handleArtistLookup(e)}></input>
            <button disabled={!this.state.artist}>Submit</button>
            {this.state.result && <div className="result-banner">{this.state.result}</div>}
        </>

        const form = (this.props.auth.token)? newArtistForm
        :  
        <>
          <i className="fa fa-map-pin" aria-hidden="true"/>
            To pin an artist you need to login to Spotify
            <div
                className="btn btn--loginApp-link"
                onClick={e => this.props.auth.spotifyLogin("/map")}
            >
            <img className="spotify-logo" src={this.props.auth.icon} alt="Spotify Logo"/> Login with Spotify
        </div>
        </>

        return(
            <div className="new-artist-form">
                <form onSubmit={this.handleSubmit}>
                    {artistLevel}
                    {artistInfo}
                    <div className="form-input-container">
                        {form}
                    </div>
                </form>
            </div>
        )
    }
}