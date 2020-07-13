import React from 'react';
import ReactDOM from 'react-dom';
import ArtistCard from './ArtistCard';

describe('ArtistCard Component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ArtistCard />, div);
        ReactDOM.unmountComponentAtNode(div);
      });
})

