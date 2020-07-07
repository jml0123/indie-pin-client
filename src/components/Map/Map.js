import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "../../../node_modules/mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from 'mapbox-gl';

import ArtistCard from "../ArtistCard/ArtistCard"
import NewArtistForm from "../NewArtistForm/NewArtistForm"

import "./Map.css"
import sampleData from './artists.geojson';



mapboxgl.accessToken = "pk.eyJ1Ijoiam1sOTIxIiwiYSI6ImNrYzc1Z3I0cjBrODIyenFwb2Ywb3R4c28ifQ.3hsSMc5rvev7U5KerHU3zw"

export default class Map extends Component {
    state = {
        lng: 5,
        lat: 34,
        zoom: 2,
        newPin: false,
        data: sampleData
    };

    async componentDidMount() {
        const onAddArtist = this.addArtist
        const togglePin = this.togglePin
        const data = this.state.data

        let marker;

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        })

        const addPopup = (el, coordinates) => {
            console.log(coordinates)
            // Add artist card here
            const placeholder = document.createElement('div');
            ReactDOM.render(el, placeholder);
        
            marker = new mapboxgl.Popup({
                closeOnClick: true,
                anchor: "bottom-left"
            })
                .setDOMContent(placeholder)
                .setLngLat(coordinates)
                .addTo(map);
        }
    
        map.on('load', function() {

            map.addSource('trees', {
              type: 'geojson',
              data: data
            });
            map.addLayer({
                id: 'trees-heat',
                type: 'heatmap',
                source: 'trees',
                maxzoom: 12,
                paint: {
                  // increase weight as diameter breast height increases
                  'heatmap-weight': {
                    property: 'popularity',
                    type: 'exponential',
                    stops: [
                      [1, 0],
                      [62, 1]
                    ]
                  },
                  // increase intensity as zoom level increases
                  'heatmap-intensity': {
                    stops: [
                      [3, 1],
                      [10, 5]
                    ]
                  },
                  // assign color values be applied to points depending on their density
                  'heatmap-color': [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0, 'rgba(236,222,239,0)',
                    0.2, 'rgb(208,209,230)',
                    0.4, 'rgb(166,189,219)',
                    0.6, 'rgb(103,169,207)',
                    0.8, 'rgb(28,144,153)'
                  ],
                  // increase radius as zoom increases
                  'heatmap-radius': {
                    stops: [
                      [1, 25],
                      [3, 66]
                    ]
                  },
                  // decrease opacity to transition into the circle layer
                  'heatmap-opacity': {
                    default: 1,
                    stops: [
                      [1, 1],
                      [4.5, 0]
                    ]
                  },
                }
              }, 'waterway-label');
              map.addLayer({
                id: 'trees-point',
                type: 'circle',
                source: 'trees',
                minzoom: 2.88,
                paint: {
                  // increase the radius of the circle as the zoom level and dbh value increase
                  // Change this based on data
                  "circle-radius": ['get', 'popularity'],
                  'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'popularity'],
                    10,
                    'rgba(33,102,172,0)',
                    30,
                    'rgb(103,169,207)',
                    50,
                    'rgb(209,229,240)',
                    70,
                    'rgb(253,219,199)',
                    90,
                    'rgb(239,138,98)',
                  ],
                  'circle-stroke-color': 'white',
                  'circle-stroke-width': 1,
                  'circle-opacity': {
                    stops: [
                      [0, 0],
                      [4.5, 1]
                    ]
                  }
                }
              }, 'waterway-label');
        });

        map.on('mouseenter', 'trees-point', function(e) {
            map.getCanvas().style.cursor = 'pointer';
        })

        map.on("click", (e) => {
          if (marker) {
            marker.remove()
          }
          if (this.state.newPin === true) {
              console.log("Called")
              map.removeLayer("pinLayer")
              map.removeSource("pins")
              togglePin()
          }
          addPopup(<NewArtistForm coordinates={[e.lngLat.lng, e.lngLat.lat]} addArtist = {onAddArtist}/>, [e.lngLat.lng, e.lngLat.lat])

          var geojson = {
              type: "FeatureCollection",
              features: [{
                  type:"Feature",
                  geometry: { type: "Point", coordinates: [ e.lngLat.lng, e.lngLat.lat ]}
              }]
          };
          map.addSource("pins", {
              "type": "geojson",
              "data": geojson
          });
          map.addLayer({
              id: "pinLayer",
              type: "circle",
              source: "pins", 
              paint: {
                  "circle-color": "pink",
                  "circle-radius": 5 
              }
          });
          
          map.flyTo({
              center: [e.lngLat.lng, e.lngLat.lat],
              speed: 0.27,
              zoom: 9,
              curve: 2,
              easing(t) {
                  return t;
              },
              essential: true
          })
          togglePin()
      });
  
        map.on('click', 'trees-point', function(e) {
            if (marker) {
              marker.remove()
            }
            const coordinates = e.features[0].geometry.coordinates.slice();
            const artistData = e.features[0].properties
            console.log(artistData)
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            } 
            addPopup(<ArtistCard data={artistData}/>, coordinates)
        });
        map.on('move', () => {
            this.setState({
                ...this.state,
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
                });
            });
    }

    addArtist = (newData) => {
      const parsedData = JSON.parse(this.state.data)
      this.setState({
        ...this.state,
        data: [...parsedData.features, newData]
      })
    }
 
    togglePin = () => {
        this.setState({
            ...this.state,
            newPin: !this.state.newPin
        })
        console.log(this.state.newPin)
    }

    render(){
        const newArtistForm = (this.state.newPin) ? <div className="artist-form">Placeholder!, make a component!</div> : null;

        return(
            <>
           
            <div ref={el => this.mapContainer = el} className="mapContainer" />
            </>
        )
    }
}

/*
DEBUGGER
 <div className='sidebarStyle'>
                <div>Latitude: {this.state.lat} Longitude: {this.state.lng} Zoom: {this.state.zoom}</div>
            </div>
*/