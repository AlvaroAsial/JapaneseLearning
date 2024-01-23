import React from 'react';
import { IonProgressBar } from '@ionic/react';

const GridItem = ({ character, pronunciation, onClick, level }) => {

    const handleOnClick = (character, pronunciation) => {
        if (level > 0) {
            onClick({ character, pronunciation,level })
        }
    };

    return (
        <div className="grid-item" onClick={() => handleOnClick(character, pronunciation)} style={{ borderColor: (level > 0) ? '#FFFFFF' :'#262130'}}>
            <b>{character}</b>
            <br></br>
            {pronunciation}
            <IonProgressBar value={level/20}></IonProgressBar>
        </div>
    );
};

export default GridItem;