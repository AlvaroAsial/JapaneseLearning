import React from 'react';
import {IonSpinner, IonProgressBar} from '@ionic/react';

const Loading = () => {
    return (
        <div className="loading-page" style={{ backgroundColor: "#1b191f" }}>
            <IonSpinner name="crescent" />
            <h1>Loading...</h1>
            <IonProgressBar color="success" value={0}></IonProgressBar>
        </div>
    );
}

export default Loading;
