import React, {useContext} from 'react';

import Nav from '../../components/Nav/Nav';
import Map from '../../components/Map/Map';

import "./MapView.css"
import AuthContext from '../../AuthContext';
import '../../styles/terminal.scss';


export default function MapView() {
    const auth = useContext(AuthContext)
    return(
        <div className="container">
        <div className="map-page screen">
            {(!auth.token) && <div className="banner banner--smblk" onClick={e => auth.spotifyLogin("/map")}><p>Login with Spotify to access all features</p></div>}
            <Nav darkMode={true}/>
            <Map auth={auth}/>
        </div>
        </div>
    )
}