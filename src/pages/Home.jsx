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
                    <h1>One-Stop Networking Tool</h1>
                    <p>By Vihaan Shah and Aanand Patel</p>
                    {/* <a href="#" className="btn btn-primary mt-3">Get Started</a> */}
                </div>
            </div>
        </div>
    );
};

export default Home;