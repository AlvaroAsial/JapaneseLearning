import React, { useEffect } from 'react';
import { IonModal, IonProgressBar, IonIcon, IonButton, IonFooter, IonToolbar, IonLabel } from '@ionic/react';
import { volumeHighOutline } from 'ionicons/icons';
import { NativeAudio } from '@capacitor-community/native-audio'

const ItemScreen = ({ character, pronunciation, level, isOpen, onClose }) => {

    NativeAudio.preload({
        assetId: pronunciation,
        assetPath: `${pronunciation}.mp3`,
        audioChannelNum: 1,
        isUrl: false
    }).catch(error => {
        console.error('Error playing audio:', error);
        console.log(pronunciation)
    });

    useEffect(() => {
        NativeAudio.preload({
            assetId: pronunciation,
            assetPath: `${pronunciation}.mp3`,
            audioChannelNum: 1,
            isUrl: false
        }).catch(error => {
            console.error('Error playing audio:', error);
            console.log(pronunciation)
        });
    },[]);

    const playAudio = () => {

        NativeAudio.play({
            assetId: pronunciation,
        }).catch(error => {
            console.error('Error playing audio:', error);
            console.log(pronunciation)
        });

    }

    return (
        <IonModal isOpen={isOpen} onWillDismiss={onClose} >
            <div className="itemscreen-content">
                <h2>{character}</h2>
                <p>Pronunciation: {pronunciation}</p>
                <IonButton style={{ width: '100%', marginTop: '50px' }} color="primary" onClick={() => playAudio()}><IonIcon icon={volumeHighOutline}></IonIcon></IonButton>
                <IonProgressBar style={{ marginTop: '50px' }} value={level / 20}></IonProgressBar>
                <IonFooter style={{ position: 'fixed', bottom: '0', width: '100%', left:'0'}}>
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

export default ItemScreen;