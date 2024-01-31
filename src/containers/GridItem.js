import React from 'react';
import { IonProgressBar } from '@ionic/react';
import { useDarkMode } from './DarkModeContext'; 

const GridItem = ({ character, pronunciation, onClick, level }) => {

    const { darkMode, toggleDarkMode } = useDarkMode();

    const handleOnClick = (character, pronunciation) => {
        if (level > 0) {
            onClick({ character, pronunciation,level })
        }
    };

    return (
        <div className="grid-item" onClick={() => handleOnClick(character, pronunciation)} style={{ borderColor: (level > 0) ? (darkMode ? '#FFFFFF' : "#08a391") : (darkMode ? '#262130' : 'lightsteelblue') }}>
            <b>{character}</b>
            <br></br>
            {pronunciation}
            <IonProgressBar value={level/20}></IonProgressBar>
        </div>
    );
};

export default GridItem;