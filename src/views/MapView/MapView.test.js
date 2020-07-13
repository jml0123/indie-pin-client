import React from 'react';
import ReactDOM from 'react-dom';
import MapView from './MapView';
import { BrowserRouter } from "react-router-dom";


describe('MapView page', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <BrowserRouter >
            <MapView />
        </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
      });
})

