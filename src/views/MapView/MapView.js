import React, {useContext} from 'react';
import Div100vh from 'react-div-100vh';

import Nav from '../../components/Nav/Nav';
import Map from '../../components/Map/Map';

import "./MapView.css"
import AuthContext from '../../AuthContext';
import '../../styles/terminal.scss';


export default function MapView() {
    const auth = useContext(AuthContext)
    return(
        <Div100vh className="container">
        <div className="map-page screen">
            {(!auth.token) && <div className="banner banner-sm--green" onClick={e => auth.spotifyLogin("/map")}><p>Login with Spotify to access all features</p></div>}
            <Nav darkMode={true}/>
            <Map auth={auth}/>
        </div>
        </Div100vh>
    )
}