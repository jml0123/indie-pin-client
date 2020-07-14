import React from "react";
import Nav from "../../components/Nav/Nav";
import "../../styles/terminal.scss";
import icon from "../../assets/8biticon.jpg";

import "./About.css";

export default function AboutPage() {
  return (
    <div className="screen">
      <div className="about-page container">
        <Nav darkMode={true} />
        <div className="about-content-wrapper">
          <div className="about-info-container">
            <a href="https://github.com/jml0123" target="_blank">
              <div className="about-img-wrapper">
                <img src={icon} />
              </div>
            </a>
          </div>
          <div className="about-description-wrapper">
            <p>
              Indie Pin was created by Miguel Lorenzo, a software developer,
              former independent artist manager, and music producer based in
              NYC. <br /> <br /> The purpose of the site is to promote
              independent artists around different parts of the globe and
              generate interest towards emerging creative communities.
            </p>
            <p id="sponsor">
              Indie Pin is in partnership with
              <a
                href="https://heatwav.co"
                target="_blank"
                className="highlight"
              >
                {" "}
                Heat.wav
              </a>
              , a mobile music platform and culture radar to discover artists
              around you area.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
