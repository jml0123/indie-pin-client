import React from 'react';
import ReactDOM from 'react-dom';
import About from './About';
import { BrowserRouter } from "react-router-dom";

describe('About page', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter>
        <About /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
      });
})

