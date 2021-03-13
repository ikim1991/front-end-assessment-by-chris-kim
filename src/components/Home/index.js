import React from 'react';
import { Link } from 'react-router-dom';
import './css/index.css';

const Home = () => {

    return(
        <div className="home">
            <Link to="/hero-section">Hero Section</Link>
            <Link to="/red">Red</Link>
            <Link to="/yellow">Yellow</Link>
            <Link to="/perks">Perks</Link>
            <Link to="/reviews">Reviews</Link>
            <Link to="/get-exp-con">Get Exp Con</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/payments">Payments</Link>
        </div>
    )

}

export default Home
