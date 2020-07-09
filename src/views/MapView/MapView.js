import React, {useContext} from 'react';

import Nav from '../../components/Nav/Nav';
import Map from '../../components/Map/Map';

import "./MapView.css"
import AuthContext from '../../AuthContext';



export default function MapView() {
    const auth = useContext(AuthContext)
    return(
        <div className="map-page">
            {(!auth.token) && <div className="banner banner--smblk" onClick={e => auth.spotifyLogin("/map")}><p>Login with Spotify to access all features</p></div>}
            <Nav/>
            <Map auth={auth}/>
        </div>
    )
}