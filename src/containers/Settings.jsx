import React from 'react';
import { IonContent, IonItem, IonPage, IonToggle, IonList, IonButton, IonAlert } from '@ionic/react';
import { useDarkMode } from './DarkModeContext'; 
import SectionDivider from '@/components/SectionDivider'

const Settings = ({restart}) => {
    const { darkMode, toggleDarkMode } = useDarkMode();  

    return (
        <div className={darkMode ? 'mainSection dark' : 'mainSection light'}>
            <IonPage className={darkMode ? 'mainSection dark' : 'mainSection light' }>
                <h1>Settings</h1>
                <SectionDivider/>
                <IonContent className="ion-padding">
                    <IonList inset={true}>
                        <IonItem className="settings-item">
                            <IonToggle checked={darkMode} onIonChange={toggleDarkMode} justify="space-between" color='primary'>
                                <h2 style={darkMode ? { color: 'white' } : {color:'black'} }>Dark Mode</h2>
                            </IonToggle>
                        </IonItem>
                    </IonList>
                    <IonList inset={true}>
                        <IonButton id="present-alert-1" expand="block" fill="outline" color={darkMode ? 'light' : 'dark'}>
                                <h2>Restart Progression</h2>
                            </IonButton>
                    </IonList>
                </IonContent>
            </IonPage>
            <IonAlert cssClass='my-custom-class'
                header="Are you sure?"
                trigger="present-alert-1"
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            return null;
                        },
                    },
                    {
                        text: 'OK',
                        role: 'confirm',
                        handler: () => {
                            restart()
                        },
                    },
                ]}
                onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
            ></IonAlert>
        </div>
    );
};

export default Settings;