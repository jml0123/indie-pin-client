import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

import "./Map.css"

mapboxgl.accessToken = "pk.eyJ1Ijoiam1sOTIxIiwiYSI6ImNrYzc1Z3I0cjBrODIyenFwb2Ywb3R4c28ifQ.3hsSMc5rvev7U5KerHU3zw"

export default class Map extends Component {
    state = {
        lng: 5,
        lat: 34,
        zoom: 2
    };

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        })
    }
    render(){
        return(
            <>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </>
        )
    }
}