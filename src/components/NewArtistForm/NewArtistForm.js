import React, {Component} from 'react';
import "./NewArtistForm.css"
import config from "../../config";
export default class NewArtistForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            artist: null,
            coordinates: this.props.coordinates,
            error: null,
            result: null,
            validator: null
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
        const social_links = Object.values(artistData.external_urls)
        const genre = (artistData.genres[0]) ? artistData.genres[0] : "uncategorized"
        const artistImage = (artistData.images[0]) ? artistData.images[0].url : "https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg"
          
        const newArtist = {
                artist_name: artistData.name,
                spotify_id: artistData.id,
                popularity: artistData.popularity,
                coordinates: this.state.coordinates,
                genres: artistData.genres,
                profile_img: artistImage,
                link_to_spotify: artistData.external_urls.spotify,
                social_links: social_links,
        }
        fetch(`${config.API_ENDPOINT}/artists`, {
            method: "POST",
            body: JSON.stringify(newArtist),
            headers: {
              "content-type": "application/json",
            }
        })
          .then(res => {
              if (!res.ok) {
                throw new Error(res.status);
              }
              res.json().then(artistData => 
                {this.setState({
                    ...this.state,
                    artist: null,
                    result: `Successfully added ${artistData.properties.artist_name}!`
                })
                this.props.addArtist(artistData)}
            )})
            .catch(e => {
                this.setState({
                    ...this.state,
                    error: e
                })
        })
    }

    setArtistData(artistData) {
        this.setState({
            ...this.state,
            artist: artistData
        })
        console.log(this.state)
    }
    handleArtistLookup(e) {
        if (!e.target.value.includes("https://open.spotify.com")) {
            this.setState({
                ...this.state,
                validator: "Must be a valid spotify link"
            })
            return 
        }
        else if (!e.target.value.includes("artist")) {
            this.setState({
                ...this.state,
                validator: "Must be a valid spotify artist link (e.g. https://open.spotify.com/artist/:artist_id)"
            })
            return
        }
        
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
                    if (!data.error) {
                        console.log(data)
                        this.setArtistData(data)
                    }
                    else {
                        this.setState({
                            ...this.state,
                            error: data.error.message,
                            validator: "Artist not found - invalid id"
                        })
                        return
                    }
                })
            )
            .catch(error =>{
                this.setState({
                    ...this.state,
                    error: error,
                })
                return
            })
    }
    render(){
        const artistInfo =  (!this.state.artist)? null :
        <div className="artist-form-header">
            <div className="artist-img-wrapper--form">
                <img src={(!this.state.artist.images.length) ? "https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg" : this.state.artist.images[0].url } alt={this.state.artist.name + " spotify profile img"}/>
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
            {this.state.validator && <div className="result-banner">{this.state.validator}</div>}
            {this.state.result && <div className="result-banner">{this.state.result}</div>}
        </>

        const form = (!this.props.auth) ? null : (this.props.auth.token)? newArtistForm
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