import React from 'react';
import ReactDOM from 'react-dom';
import PopUp from './PopUp';

describe('PopUp Component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PopUp />, div);
        ReactDOM.unmountComponentAtNode(div);
      });
})

