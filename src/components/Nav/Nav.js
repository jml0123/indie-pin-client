import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Nav.scss";
export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.menu = React.createRef();
    this.navWrapper = React.createRef();
    this.navAccordion = React.createRef();
    this.navShape = React.createRef();
    this.navLinks = React.createRef();
    this.menuIcon = React.createRef();

    this.state = {
      toggledMenu: false,
    };
  }
  componentDidMount() {
    // make this a util function
    const loadScript = (src) => {
      const tag = document.createElement("script");
      tag.src = src;
      tag.async = true;

      document.body.appendChild(tag);
    };
    loadScript("https://use.fontawesome.com/8ee48a1bb5.js");
  }

  handleMenuClick = () => {
    this.setState({
      toggledMenu: !this.state.toggledMenu,
    });
  };

  render() {
    const darkMode = this.props.darkMode ? "nav-wrapper--dark" : "nav-wrapper";

    return (
      <div className={darkMode} ref={this.navWrapper}>
        <nav>
          <Link to="/">
            <div className="logo-wrapper">
              <h1>Indie Pin</h1>
            </div>
          </Link>
          <div
            className={
              !this.state.toggledMenu ? "nav-links" : "nav-links full-menu"
            }
          >
            <div
              className={
                !this.state.toggledMenu ? "nav-shape" : "nav-shape full-menu"
              }
            />
            <div className="menu" onClick={this.handleMenuClick}>
              <i
                className={
                  !this.state.toggledMenu ? "fa fa-bars" : "fa fa-times"
                }
                aria-hidden="true"
              />
            </div>
            <ul className={!this.state.toggledMenu ? "links" : "links visible"}>
              <Link to="/map">
                <li>The Map</li>
              </Link>
              <Link to="/about">
                <li>About</li>
              </Link>
              <Link to="/charts">
                <li>Top Artists</li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
