import React from 'react';

import Nav from '../../components/Nav/Nav';
import Chart from '../../components/Chart/Chart';

import "./TopArtists.css"

export default function TopArtistsPage() {
    return (
        <div className="top-page">
            <Nav/>
            <div className="top-artists-wrapper">
                <div className="top-header-container">
                    <h1>Top Artists on IndiePin</h1>
                    <p>By Popularity Index and # of endorsements</p>
                </div>
                <div className="top-list-container">
                    <Chart/>
                </div>
            </div>
        </div>
    )
}