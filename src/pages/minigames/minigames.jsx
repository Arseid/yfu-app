import React from 'react';
import './minigames.css';
import bg_minigames from '../../ressources/bg_minigames.png';

const Minigames = () => {
    return <div className='Minigames' style={{backgroundImage: `url(${bg_minigames})`}}>
        <h1>Minigames</h1>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    </div>
};

export default Minigames;
