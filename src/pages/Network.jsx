import React, { useState } from 'react';
import NavigationBar from '../components/Navbar';

const Network = () => {
    return (
        <div>
            <NavigationBar />
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className='overlay'></div>
            </div>
        </div>
    );
}

export default Network;