import React from 'react';
import { IonModal, IonProgressBar, IonButton, IonFooter, IonToolbar, IonLabel, IonContent } from '@ionic/react';
import SectionDivider from './SectionDivider';
import { useDarkMode } from './../containers/DarkModeContext'; 

const KanjiItemScreen = ({ character, pronunciation, level, isOpen, onClose, freq, on, kun, meanings }) => {

    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <IonModal isOpen={isOpen} onWillDismiss={onClose} > <IonContent>
            <div className={darkMode ? 'itemscreen-content dark' : 'itemscreen-content light'}>
                <h2>{character}</h2>
                <SectionDivider />
                <h5>Meaning:</h5>
                {meanings.map(m => <p>{m}</p>)}
                <br></br>
                <h5>Frequency: {freq}</h5>
                <br></br>
                <h5>On Readings:</h5>
                {on ? on.map(m => <p>{m}</p>) : "N/A"}
                <br></br>
                <h5>Kun Readings:</h5>
                {kun ? kun.map(m => <p>{m}</p>) : "N/A"}
                <IonProgressBar value={level / 20}></IonProgressBar>
                <IonFooter style={{ position: 'fixed', bottom: '0', width: '100%', left: '0' }}>
                    <IonToolbar>
                        <IonButton onClick={onClose} style={{ width: '50%' }} color="light" fill="clear">
                            <IonLabel style={{ color: 'black' }}><b>Close</b></IonLabel>
                        </IonButton>
                    </IonToolbar>
                </IonFooter>
            </div></IonContent>
        </IonModal>
    );
};

export default KanjiItemScreen;