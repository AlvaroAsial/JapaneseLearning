import React from 'react';
import { IonModal, IonProgressBar, IonIcon } from '@ionic/react';
import { volumeHighOutline } from 'ionicons/icons';
import { useSwipeable } from 'react-swipeable';

const KanjiItemScreen = ({ character, pronunciation, isOpen, onClose }) => {

    const handleSwipe = useSwipeable({
        onSwiped: () => {
            onClose();
        }
    });

    return (
        <IonModal isOpen={isOpen} onWillDismiss={onClose} {...handleSwipe} >
            <div className="itemscreen-content">
                <h2>{character}</h2>
                <p>Pronunciation: {pronunciation}</p>
                <br></br>
                <br></br>
                <IonIcon icon={volumeHighOutline}/>
                <br></br>
                <br></br>
                <br></br>
                <IonProgressBar value={0}></IonProgressBar>
            </div>
        </IonModal>
    );
};

export default KanjiItemScreen;