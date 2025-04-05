import React from 'react';
import './Home.css'; // Create this file for custom styles
import NavigationBar from '../components/Navbar';

const Home = () => {
    return (
        <div>
            <NavigationBar />
            <div className="hero">
                <div className="overlay"></div>
                <div className="container position-relative">
                    <h2>Networking Made Easy.</h2>
                    <p>By Vihaan Shah and Aanand Patel</p>
                </div>
            </div>
        </div>
    );
};

export default Home;