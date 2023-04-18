import React from 'react';
import './home.css';
import bg_home from '../../ressources/bg_home.png';

const Home = () => {
    return <div className='Home' style={{backgroundImage: `url(${bg_home})`}}>
        <h1>Home</h1>
        <button>Hey</button>
    </div>
};

export default Home;
