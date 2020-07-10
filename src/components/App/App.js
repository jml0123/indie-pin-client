import React, {Component} from 'react';
import hash from "../../utils/hash";
import {Route} from "react-router-dom";

import LandingPage from "../../views/Landing/Landing";
import TopArtistsPage from "../../views/TopArtists/TopArtists";
import MapView from "../../views/MapView/MapView";
import AboutPage from "../../views/About/About";

import AuthContext from "../../AuthContext";

import "./App.css";
import SpotifyWhiteIcon from "../../icons/Spotify_Icon_RGB_White.png";


// Add a random string for state/encoding here.

class App extends Component {
  state = {
    token: null
  }
  componentDidMount(){
      // Set token
      let _token = hash.access_token;
      if (_token) {
        // Set token
        this.setState({
          token: _token
        });
      }
  }
    spotifyLogin = (redirectPath) => {
      // Make this based on development or production environment...
      const redirectUri = `https://indie-pin-client.jml0123.vercel.app${redirectPath}`;
      //const redirectUri = `http://localhost:3000${redirectPath}`;
      const scopes = [
        "user-follow-modify",
        "user-follow-read",
        "user-library-read",
      ];
      const clientId = "3e760958614243279a0f130d25c2c433";
      const authEndpoint = 'https://accounts.spotify.com/authorize';
      window.location.assign(`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`);
    }
  
    render() {

      const AuthContextVal = {
        token: this.state.token,
        spotifyLogin: this.spotifyLogin,
        icon: SpotifyWhiteIcon,
      } 

      // Make the spotify button on the landing page
      console.log(this.state)
      return (
        <main className="App">
          <AuthContext.Provider value={AuthContextVal}>
            <Route exact path={"/"} component={LandingPage}/>
            <Route exact path={"/about"} component={AboutPage}/>
            <Route exact path={"/map"} component={MapView}/>
            <Route exact path={"/charts"} component={TopArtistsPage}/>
          </AuthContext.Provider>
          
        </main>
    );
  }
}

export default App;
