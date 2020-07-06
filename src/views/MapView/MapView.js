import React from 'react';

import Nav from '../../components/Nav/Nav';
import Map from '../../components/Map/Map';

import "./MapView.css"



export default function MapView() {
    return(
        <div className="map-page">
            <Nav/>
            <Map/>
        </div>
    )
}