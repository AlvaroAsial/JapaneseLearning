import React, {useEffect} from 'react';
import { IonModal, IonProgressBar, IonIcon, IonButton, IonFooter, IonToolbar, IonLabel } from '@ionic/react';
import { volumeHighOutline } from 'ionicons/icons';
import { NativeAudio } from '@capacitor-community/native-audio'
import { useDarkMode } from '@/containers/DarkModeContext'; 
import { Capacitor } from "@capacitor/core";

const ItemScreen = ({ character, pronunciation, level, isOpen, onClose }) => {

    const { darkMode } = useDarkMode();

    useEffect(() => {
        const platform = Capacitor.getPlatform();
        let ap = `${pronunciation}.mp3`
        if (platform !== "web") {
            ap = `public/assets/sounds/${pronunciation}.mp3`
        }
        NativeAudio.preload({
            assetId: pronunciation,
            assetPath: ap,
            audioChannelNum: 1,
            isUrl: false
        }).catch(error => {
            console.error('Error playing audio:', error);
            console.log(pronunciation)
        });
    }, []);

    const playAudio = () => {
        NativeAudio.play({
            assetId: pronunciation,
        }).catch(error => {
            console.error('Error playing audio:', error);
            console.log(pronunciation)
        });
    }

    const unloadAudio = () => {
        NativeAudio.unload({
            assetId: pronunciation,
        });
        onClose();
    }

    return (
        <IonModal isOpen={isOpen} onWillDismiss={onClose} >
            <div className={darkMode ? 'itemscreen-content dark' : 'itemscreen-content light'}>
                <h2>{character}</h2>
                <p>Pronunciation: {pronunciation}</p>
                <IonButton style={{ width: '100%', marginTop: '50px' }} color="primary" onClick={() => playAudio()}><IonIcon icon={volumeHighOutline}></IonIcon></IonButton>
                <IonProgressBar style={{ marginTop: '50px' }} value={level / 20}></IonProgressBar>
                <IonFooter style={{ position: 'fixed', bottom: '0', width: '100%', left:'0'}}>
                    <IonToolbar>
                        <IonButton onClick={unloadAudio} style={{ width: '100%', background:"white", height:'75px' }} color='light' fill="clear">
                            <IonLabel style={{ color: 'black' }}><b>Close</b></IonLabel>
                        </IonButton>
                    </IonToolbar>
                </IonFooter>
            </div>
        </IonModal>
    );
};

export default ItemScreen;