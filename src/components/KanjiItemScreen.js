import React from 'react';
import { IonModal, IonProgressBar, IonIcon, IonButton, IonFooter, IonToolbar, IonLabel } from '@ionic/react';
import { volumeHighOutline } from 'ionicons/icons';
import { useSwipeable } from 'react-swipeable';

const KanjiItemScreen = ({ character, pronunciation, level, isOpen, onClose,freq,on,kun,meanings }) => {

    const handleSwipe = useSwipeable({
        onSwiped: () => {
            onClose();
        }
    });

    return (
        <IonModal isOpen={isOpen} onWillDismiss={onClose} {...handleSwipe} >
            <div className="itemscreen-content">
                <h2>{character}</h2>
                <br></br>
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
                <br></br>
                <IonProgressBar value={level / 20}></IonProgressBar>
                <IonFooter style={{ position: 'fixed', bottom: '0', width: '100%', left: '0' }}>
                    <IonToolbar>
                        <IonButton onClick={onClose} style={{ width: '100%' }} color="light" fill="clear">
                            <IonLabel style={{ color: 'black' }}><b>Close</b></IonLabel>
                        </IonButton>
                    </IonToolbar>
                </IonFooter>
            </div>
        </IonModal>
    );
};

export default KanjiItemScreen;