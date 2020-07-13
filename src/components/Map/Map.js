import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "../../../node_modules/mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import ArtistCard from "../ArtistCard/ArtistCard"
import NewArtistForm from "../NewArtistForm/NewArtistForm"
import PopUp from "../PopUp/PopUp"

import "./Map.css";
import _mapSettings from './_mapSettings';
import randomString from "../../utils/randomString";
import config from "../../config";

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN
export default class Map extends Component {
     state = {
        lng: -70.4303,
        lat: 34.5490,
        zoom: 2.00,
        pitch: 0, 
        bearing: 0,
        world: null,
        newPin: false,
        map: null,
        indicator: "SEARCHING...",
        data: null,
        map: null,
        search: null,
    };

    async componentDidMount() {
      // Check to see if user has visited this page before using localStorage
      // If it's the first time, trigger the tutorial
      let visited = localStorage["visited"];
      if(visited) {
        this.setState({ tutorial: false })
      } else {
            localStorage["visited"] = true;
            this.setState({ tutorial: true});
      }
      this.createRandomWorld();
      const onAddArtist = this.addArtist
      const togglePin = this.togglePin
      const indicatorText = this.foundArtist;
      const clickZoom = this.correctedZoom;
      let marker;
      let timer;

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
            .addTo(this.map);
        }
          fetch(`${config.API_ENDPOINT}/artists`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        })
        .then(res => {
            if (!res.ok) {
              throw new Error(res.status);
            }
            res.json().then(artistData => 
              {
                const data = {
                  "type": "FeatureCollection",
                  "features":artistData
                }
                this.setArtists(data)
              
                // make this a util function
                const loadScript = (src) => {
                  const tag = document.createElement('script');
                  tag.src = src;
                  tag.async = true;
              
                  document.body.appendChild(tag);    
                }
                loadScript("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.min.js")
      
                this.map = new mapboxgl.Map({
                    container: this.mapContainer,
                    style: "mapbox://styles/jml921/ckcik3yl41j6a1imexnba8j1c",
                    center: [this.state.lng, this.state.lat],
                    zoom: this.state.zoom,
                    bearing: this.state.bearing,
                    pitch: this.state.pitch,
                    center: [this.state.lng, this.state.lat]
                })
                const map = this.map
                _mapSettings(map)
        
                map.on('style.load', (e) => {
                  map.addSource('artists', {
                    type: 'geojson',
                    data: data
                  })
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
                  addPopup(<NewArtistForm coordinates={[e.lngLat.lng, e.lngLat.lat]} addArtist = {onAddArtist} auth={this.props.auth}/>, [e.lngLat.lng, e.lngLat.lat])
                  indicatorText(true, "SIGNAL ESTABLISHED")
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
                    'id': 'pinLayer',
                    'type': 'symbol',
                    'source': 'pins',
                    'layout': {
                      'icon-image': 'pulsing-dot'
                    }
                    });  
                // Fly to point
                map.flyTo({
                      center: [e.lngLat.lng, e.lngLat.lat],
                      speed: 0.23,
                      zoom: clickZoom(),
                      curve: 2.5,
                      easing(t) {
                          return t;
                      },
                      essential: true
                  })
                  togglePin()
                });
        
              // Make this a re-usable function!
            map.on('click', 'artists-point', (e) => {
              if (marker) {
                marker.remove()
              }
              indicatorText()
              const coordinates = e.features[0].geometry.coordinates.slice();
              const artistData = e.features[0].properties
              console.log(artistData)
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              } 
              addPopup(<ArtistCard data={artistData} auth={this.props.auth}/>, coordinates)
          });
            // Make this a re-usable function!
          map.on('mouseenter', 'artists-point', (e) => {
            if (marker) {
              marker.remove()
            }
            clearTimeout(timer)
            indicatorText()
            const coordinates = e.features[0].geometry.coordinates.slice();
            const artistData = e.features[0].properties
            console.log(artistData)
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            } 
            addPopup(<ArtistCard data={artistData} auth={this.props.auth}/>, coordinates)
          });
          map.on('mouseleave', 'artists-point', function(e) {
            if (marker) {    
              timer = setTimeout(() => { 
                marker.remove()
              }, 2900);
            }
            indicatorText(true)
          });
          map.on('move', () => {
              this.setState({
                    ...this.state,
                    lng: map.getCenter().lng.toFixed(4),
                    lat: map.getCenter().lat.toFixed(4),
                    zoom: map.getZoom().toFixed(2),
                    pitch: map.getPitch(),
                    bearing: map.getBearing()
                  });
                })
              map.addControl(
                this.geocoder = new MapboxGeocoder({
                accessToken: config.MAPBOX_ACCESS_TOKEN,
                localGeocoder: this.forwardGeocoder,
                zoom: 14,
                placeholder: 'Enter search e.g. Delroy Edwards',
                position: 'bottom-left',
                mapboxgl: mapboxgl
              }), 'bottom-left'
              )
          
        
              this.setState({
                ...this.state,
                map: map
              })
              console.log(this.state.data)
              })})
            .catch(e => {
                this.setState({
                  ...this.state,
                  error: e
              })
          })}

        
    correctedZoom = () => {
      return (this.state.zoom > 6) ? this.state.zoom : 6
    }


    forwardGeocoder = (query) => {
      const matchingFeatures = [];
      const customData = this.state.data;
      for (let i = 0; i < customData.features.length; i++) {
        let feature = customData.features[i];
        // handle queries with different capitalization than the source data by calling toLowerCase()
        if (feature.properties.artist_name
          .toLowerCase()
          .search(query.toLowerCase()) !== -1)
        {
          feature['place_name'] = `🎵 ${feature.properties.artist_name}`
          feature['center'] = feature.geometry.coordinates;
          feature['place_type'] = ['artist'];
          matchingFeatures.push(feature);
        }
      }
      return matchingFeatures;
    }
    addArtist = (newData) => {
      console.log(this.state.data.features)
      this.state.data.features.push(newData)
      this.setState({
        ...this.state,
        data: {
          ...this.state.data, 
          features: this.state.data.features
        }
      })
      console.log(newData)
      console.log("New Artist!")
      console.log(this.state.data)
      this.map.getSource('artists').setData(this.state.data)
    }
 
    foundArtist = (off, status) => {
      if(off && !status) {
        this.setState({
          ...this.state,
          indicator: "SEARCHING..."
        }) 
      }
      else if (off && status) {
        this.setState({
          ...this.state,
          indicator: <span className="signal">{status}</span>
        }) 
      }
      else {
        this.setState({
          ...this.state,
          indicator: <span className="found">HEAT SIGNATURE FOUND</span>,
        }) 
      }
    }

    togglePin = () => {
        this.setState({
            ...this.state,
            newPin: !this.state.newPin
        })
    }

    toggleSearch = () => {
      this.setState({
          ...this.state,
          search: !this.state.search
      })
    }
    setArtists = (geoJSON) => {
      console.log(geoJSON)
      this.setState({
        ...this.state,
        data: geoJSON
      })
    }
    createRandomWorld = () => {
      const altEarth = randomString()
      this.setState({
        ...this.state,
        world: `EARTH ${altEarth}`
      })
    }
    togglePopUp = () =>{
      this.setState({
        ...this.state,
        tutorial: !this.state.tutorial
      }) 
    }

    render(){
        return(
            <>
              <div className='sidebarStyle' id="DEBUGGER_REMOVE_BEFORE_DEPLOY">
                <div>
                    <h1>INDIEPIN_V_{config.VERSION}</h1>
                    <p>WORLD: {this.state.world}</p>
                    <p>STATUS: {this.state.indicator}</p>
                    <p>LAT: {this.state.lat}</p>
                    <p>LNG: {this.state.lng}</p>
                    <p>ZOOM: {this.state.zoom}</p>
                    <p>PITCH: {this.state.pitch}</p> 
                    <p>BEARING: {this.state.bearing}</p>
                    <p id="help" onClick={() => this.togglePopUp()}>HELP</p>
                </div>
              </div>
              <div ref={el => this.mapContainer = el} className="mapContainer" />
              {this.state.tutorial && <PopUp closeWindow = {this.togglePopUp} version = {config.VERSION}/>}
            </>
        )
    }
}