import React, { Component } from "react";
import "./Chart.css";
import ChartRow from "../ChartRow/ChartRow";

import config from "../../config";
export default class Chart extends Component {
  state = {
    artists: null,
    error: null,
  };
  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/artists/top/50`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        res.json().then((artistData) => this.setTopArtists(artistData));
      })
      .catch((e) => {
        this.setState({
          ...this.state,
          error: e,
        });
      });
  }
  setTopArtists = (artists) => {
    this.setState({
      ...this.state,
      artists: artists,
    });
  };

  render() {
    let chartRows;
    if (this.state.artists) {
      chartRows = this.state.artists.map((artist) => {
        return (
          <ChartRow
            artist_name={artist.properties.artist_name}
            genres={artist.properties.genres}
            popularity={artist.properties.popularity}
            link_to_spotify={artist.properties.link_to_spotify}
            social_links={artist.properties.social_links}
            profile_img={artist.properties.profile_img}
            key={artist.properties.artist_name}
          />
        );
      });
    }

    return (
      <div className="Rtable Rtable--4cols Rtable--collapse top-artists-table">
        <div className="Rtable-cell t-heading">Name</div>
        <div className="Rtable-cell t-heading">Level</div>
        <div className="Rtable-cell t-heading">Genre</div>
        <div className="Rtable-cell t-heading">Links</div>
        {!chartRows ? null : chartRows}
      </div>
    );
  }
}

/*


[
            { 
                artistName:  "George Cloonly",
                genre: "Surf hop",
                popularity: 88,
                linkToSpotify: "https://spotify.com",
                socials: {
                    IG: "https://instagram.com",
                    Twitter: "https://twitter.com"
                }
            },
            { 
                artistName:  "Delroy Edwards",
                genre: "Techno",
                popularity: 55,
                linkToSpotify: "https://spotify.com",
                socials: {
                    IG: "https://instagram.com",
                    Bandcamp: "https://bandcamp.com",
                }
            },
        ],
*/
