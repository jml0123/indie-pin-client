import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "../../../node_modules/mapbox-gl/dist/mapbox-gl.css"
import mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import ArtistCard from "../ArtistCard/ArtistCard"
import NewArtistForm from "../NewArtistForm/NewArtistForm"

import "./Map.css";



mapboxgl.accessToken = "pk.eyJ1Ijoiam1sOTIxIiwiYSI6ImNrYzc1Z3I0cjBrODIyenFwb2Ywb3R4c28ifQ.3hsSMc5rvev7U5KerHU3zw"

export default class Map extends Component {
  

    state = {
        lng: -39.7539,
        lat: 32.8408,
        zoom: 1.69,
        pitch: 0, // pitch in degrees
        bearing: 0,
        newPin: false,
        // Placeholder for now. Get from server!
        data: {
          "type": "FeatureCollection",
          "features":[
              {
                  "type":"Feature",
                  "properties": {
                      "popularity": 68,
                       "artistName": "Madlib",
                       "genre": "alternative hip hop",
                       "image": "https://i.scdn.co/image/5df69b398c260be003acffc215956676388c21bc",
                       "linkToSpotify": "https://open.spotify.com/artist/5LhTec3c7dcqBvpLRWbMcf",
                       "neighborhood": "Oxnard, CA",
                       "socials": {
                          "spotify": "https://open.spotify.com/artist/5LhTec3c7dcqBvpLRWbMcf"
                       }
                  },
                  "geometry":{
                      "type":"Point",
                      "coordinates":[-119.170898,34.196411]
                  }
              },
              {
                  "type":"Feature",
                  "properties":{
                      "popularity": 22,
                       "artistName": "Delroy Edwards",
                       "genre": "float house",
                       "image":"https://i.scdn.co/image/c2264701a33bdf1dc4e6bfdabf29c5107ac41bf4",
                       "neighborhood": "Los Angeles, CA",
                       "linkToSpotify": "https://open.spotify.com/artist/683gIqfxdjjg2sowYxBHIQ",
                       "socials": {
                          "spotify": "https://open.spotify.com/artist/683gIqfxdjjg2sowYxBHIQ"
                       }
                  },
                  "geometry":{
                      "type":"Point",
                      "coordinates":[-118.243683,34.052235]
                  }
              },
              {
                  "type":"Feature",
                  "properties":{
                      "popularity":50,
                       "artistName": "MIA GLADSTONE",
                       "genre": "Uncategorized",
                       "image": "https://i.scdn.co/image/cb2e4e4dabc8134e8b69e35a283873bd2efdcb4d",
                       "neighborhood": "Maplewood, NJ",
                       "linkToSpotify": "https://open.spotify.com/artist/6XoXNsXj8wck0oVUNwxcmF",
                       "socials": {
                          "spotify": "https://open.spotify.com/artist/6XoXNsXj8wck0oVUNwxcmF"
                       }
                  },
                  "geometry":{
                      "type":"Point",
                      "coordinates":[-74.271996,40.729980]
                  }
              }
          ]
      },
      map: null
    };

    async componentDidMount() {
        const onAddArtist = this.addArtist
        const togglePin = this.togglePin
        const data = this.state.data
        let marker;
        let timer;

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
            style: "mapbox://styles/mapbox/outdoors-v11",
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
            bearing: this.state.bearing,
            pitch: this.state.pitch,
            center: [this.state.lng, this.state.lat]
        })
        const map = this.map;
      
        const size = 90;
          const pulsingDot = {
          width: size,
          height: size,
          data: new Uint8Array(size * size * 4),
           
          // get rendering context for the map canvas when layer is added to the map
          onAdd: function() {
          var canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext('2d');
          },
           
          // called once before every frame where the icon will be used
          render: function() {
          var duration = 1000;
          var t = (performance.now() % duration) / duration;
           
          var radius = (size / 2) * 0.3;
          var outerRadius = (size / 2) * 0.7 * t + radius;
          var context = this.context;
           
          // draw outer circle
          context.clearRect(0, 0, this.width, this.height);
          context.beginPath();
          context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2
          );
          context.fillStyle = 'rgba(125, 135, 242,' + (1 - t) + ')';
          context.fill();
           
          // draw inner circle
          context.beginPath();
          context.arc(
          this.width / 2,
          this.height / 2,
          radius,
          0,
          Math.PI * 2
          );
          context.fillStyle = 'rgba(242, 135, 125, 0.9)';
          context.strokeStyle = 'white';
          context.lineWidth = 2 + 4 * (1 - t);
          context.fill();
          context.stroke();
           
          // update this image's data with data from the canvas
          this.data = context.getImageData(
          0,
          0,
          this.width,
          this.height
          ).data;
       

          // continuously repaint the map, resulting in the smooth animation of the dot
          map.triggerRepaint();

          // return `true` to let the map know that the image was updated
          return true;
          }
          };


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
            map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
            map.addSource('artists', {
              type: 'geojson',
              data: data
            });
            map.addLayer({
                id: 'artists-heat',
                type: 'heatmap',
                source: 'artists',
                maxzoom: 12,
                paint: {
                  // increase weight as diameter breast height increases
                  'heatmap-weight': {
                    property: 'popularity',
                    type: 'exponential',
                    stops: [
                      [1, 0.33],
                      [62, 2]
                    ]
                  },
                  // increase intensity as zoom level increases
                  'heatmap-intensity': {
                    stops: [
                      [1, 0.66],
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
                      [1, 5],
                      [3, 75]
                    ]
                  },
                  // decrease opacity to transition into the circle layer
                  'heatmap-opacity': {
                    default: 1,
                    stops: [
                      [0, 1],
                      [4.75, 0]
                    ]
                  },
                }
              }, 'waterway-label');
              map.addLayer({
                id: 'artists-point',
                type: 'circle',
                source: 'artists',
                minzoom: 2.88,
                paint: {
                  // increase the radius of the circle as the zoom level and dbh value increase
                  // Change this based on data
                  "circle-radius": ['+', 12, ['number', ['get', 'popularity'], 12]],
                  'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'popularity'],
                    5,
                    'rgba(103,169,207,0.1)',
                    10,
                    'rgba(33,102,172,0.5)',
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
                  'circle-stroke-width': 1.33,
                  'circle-opacity': {
                    stops: [
                      [0, 0],
                      [4.5, 1]
                    ]
                  }
                }
              }, 'waterway-label');
        });

        map.on('mouseenter', 'artists-point', function(e) {
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
          addPopup(<NewArtistForm coordinates={[e.lngLat.lng, e.lngLat.lat]} addArtist = {onAddArtist} auth={this.props.auth}/>, [e.lngLat.lng, e.lngLat.lat])

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
              zoom: 6,
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
            setTimeout(() => { 
              marker.remove()
            }, 2900);
          }
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
            });

      map.addControl(
        this.geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          localGeocoder: this.forwardGeocoder,
          zoom: 14,
          placeholder: 'Enter search e.g. Delroy Edwards',
          mapboxgl: mapboxgl
        }), 'bottom-left'
      );

    }
    
    forwardGeocoder = (query) => {
      const matchingFeatures = [];
      const customData = this.state.data
      for (let i = 0; i < customData.features.length; i++) {
      let feature = customData.features[i];
      // handle queries with different capitalization than the source data by calling toLowerCase()
      if (
      feature.properties.artistName
      .toLowerCase()
      .search(query.toLowerCase()) !== -1
      ) {
      // add a tree emoji as a prefix for custom data results
      // using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
      feature['place_name'] = `🎵 ${feature.properties.artistName}`
      feature['center'] = feature.geometry.coordinates;
      feature['place_type'] = ['artist'];
      matchingFeatures.push(feature);
      }
      }
      return matchingFeatures;
    }
    componentWillUnmount() {
      this.map.remove();
    }

 

    addArtist = (newData) => {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data, 
          features: this.state.data.features.push(newData),
        }
      })
      console.log(newData)
      console.log("New Artist!")
      console.log(this.state.data)
      this.map.getSource('artists').setData(this.state.data)
    }
 

    

    togglePin = () => {
        this.setState({
            ...this.state,
            newPin: !this.state.newPin
        })
        console.log(this.state.newPin)
    }

    render(){
        return(
            <>
            <div ref={el => this.mapContainer = el} className="mapContainer" />
            </>
        )
    }
}

/*
     <div className='sidebarStyle' id="DEBUGGER_REMOVE_AFTER_STYLING">
                <div>
                    Latitude: {this.state.lat} Longitude: {this.state.lng} Zoom: {this.state.zoom}
                    Pitch: {this.state.pitch}  Bearing: {this.state.bearing}
                
                </div>
            </div>
*/