import React from "react";

import Nav from "../../components/Nav/Nav";
import Chart from "../../components/Chart/Chart";

import "./TopArtists.css";
import "../../styles/terminal.scss";
export default function TopArtistsPage(props) {
  return (
    <>
      <Nav darkMode={true} />
      <div className="container">
        <div className="top-page screen">
          <div className="top-artists-wrapper">
            <div className="top-header-container">
              <h1>Top Artists on IndiePin</h1>
              <p>By Popularity</p>
            </div>
            <div className="top-list-container">
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
