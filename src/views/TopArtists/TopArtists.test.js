import React from 'react';
import ReactDOM from 'react-dom';
import TopArtists from './TopArtists';
import { BrowserRouter } from "react-router-dom";

describe('TopArtists page', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter>
        <TopArtists /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
      });
})

