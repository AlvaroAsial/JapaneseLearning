import React, { useState } from 'react';
import { IonList, IonSearchbar, IonItem, IonModal, IonButton, IonFooter, IonToolbar, IonLabel, IonNote, IonContent } from '@ionic/react';
import KanjiItemScreen from '../components/KanjiItemScreen';

const LookupKanji = ({ isOpen, data, info, onClose }) => {

    let [results, setResults] = useState(data);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const handleInput = (ev) => {
        let query = '';
        const target = ev.target;
        if (target) query = target.value.toLowerCase();
        setResults(data.filter((d) => (d[0].toLowerCase().indexOf(query) > -1) || (d[1].join().toLowerCase().indexOf(query) > -1)));
    };

    const handleCloseItem = () => {
        setSelectedCharacter(null);
    };

    return (
        <IonModal isOpen={isOpen} onWillDismiss={onClose} >
                <div className="itemscreen-content">
                <IonSearchbar color='light' onIonInput={(ev) => handleInput(ev)}></IonSearchbar>
                <IonContent className="y" >
                <IonList>
                    {results.map((result) => (
                        <IonItem key={result[0]} button="true" onClick={() => setSelectedCharacter(info[result[0]])}>
                              <IonLabel>{result[0]}</IonLabel>
                              <IonNote color="medium">{result[1][0]}</IonNote>
                          </IonItem>

                    ))}
                    </IonList>
                </IonContent>
            </div>
            <IonFooter style={{ position: 'fixed', bottom: '0', width: '100%', left: '0' }}>
                <IonToolbar>
                    <IonButton onClick={onClose} style={{ width: '100%' }} color="light" fill="clear">
                        <IonLabel style={{ color: 'black' }}><b>Close</b></IonLabel>
                    </IonButton>
                </IonToolbar>
            </IonFooter>
            {selectedCharacter !== null && < KanjiItemScreen
                isOpen={selectedCharacter !== null}
                onClose={handleCloseItem}
                character={selectedCharacter?.character}
                pronunciation={selectedCharacter?.pronunciation}
                level={selectedCharacter?.level}
                freq={selectedCharacter?.freq}
                meanings={selectedCharacter?.meanings}
                on={selectedCharacter?.readings_on}
                kun={selectedCharacter?.readings_kun}
            />}
            </IonModal>
    );
};

export default LookupKanji;