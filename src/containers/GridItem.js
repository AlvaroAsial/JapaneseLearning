import React from 'react';
import { IonProgressBar } from '@ionic/react';

const GridItem = ({ character, pronunciation, onClick }) => {
    return (
        <div className="grid-item" onClick={() => onClick({ character, pronunciation })}>
            <b>{character}</b>
            <br></br>
            {pronunciation}
            <IonProgressBar value={0}></IonProgressBar>
        </div>
    );
};

export default GridItem;