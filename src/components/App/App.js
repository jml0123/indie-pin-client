import React from 'react';
import {Route} from "react-router-dom";

import LandingPage from "../../views/Landing/Landing";
import TopArtistsPage from "../../views/TopArtists/TopArtists";
import MapView from "../../views/MapView/MapView";
import AboutPage from "../../views/About/About";

function App() {
  return (
    <main className="App">
      <Route exact path={"/"} component={LandingPage}/>
      <Route exact path={"/about"} component={AboutPage}/>
      <Route exact path={"/map"} component={MapView}/>
      <Route exact path={"/charts"} component={TopArtistsPage}/>
    </main>
  );
}

export default App;
