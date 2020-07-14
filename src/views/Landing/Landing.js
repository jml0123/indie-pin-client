import React, { useContext } from "react";
import Div100vh from "react-div-100vh";
import { Link } from "react-router-dom";
import AuthContext from "../../AuthContext";
import "./Landing.css";
import GlobeBg from "../../assets/globe.jpg";
import "../../styles/terminal.scss";

export default function LandingPage(props) {
  const auth = useContext(AuthContext);
  const cta = auth.token ? (
    <Link to="/map">
      <button className="btn--go">Explore The World</button>
    </Link>
  ) : (
    <div className="cta-wrapper">
      <div
        className="btn btn--loginApp-link"
        onClick={(e) => auth.spotifyLogin("")}
      >
        <img className="spotify-logo" src={auth.icon} alt="Spotify Logo" />{" "}
        Login with Spotify
      </div>
      <p>
        Or try a{" "}
        <Link to="/map">
          <span>demo</span>
        </Link>{" "}
        with limited features
      </p>
    </div>
  );

  return (
    <Div100vh className="container">
      <div
        className="splash-page screen"
        style={{ background: `url(${GlobeBg})` }}
      >
        <div className="splash-content-wrapper">
          <div className="splash-header-container">
            <h1>Indie Pin</h1>
            <p>Put yourself or your favorite artists on the map</p>
          </div>
          <div className="btn-wrapper">{cta}</div>
          <p className="version-info">Version {props.version}</p>
        </div>
      </div>
    </Div100vh>
  );
}
