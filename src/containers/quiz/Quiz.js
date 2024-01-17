import React, { useState, useEffect } from 'react';
import MultipleChoiceQ from './MultipleChoiceQ';
import { IonModal, IonProgressBar, IonIcon, IonFooter, IonHeader, IonTitle, IonToolbar, IonButtons, IonLabel, IonButton } from '@ionic/react';
import { close } from 'ionicons/icons';

const Quiz = ({ type, isOpen, onClose }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userResponses, setUserResponses] = useState([]);
    const totalQuestions = 10;

    useEffect(() => {
        //Quiz Generation
    }, []);

    const handleAnswer = () => {

        setUserResponses([...userResponses, 1]);


        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            onClose();
        }
    };

    const renderQuestion = () => {
        switch (currentQuestion % 4) {
            case 0:
                return <MultipleChoiceQ onAnswer={handleAnswer} />;
            default:
                return null;
        }
    };

    return (
        <div className="Quiz" style={{ height: '100vh' }}>
            <IonHeader>
                <IonToolbar color="tertiary">
                    <IonButtons slot="start">
                        <IonButton onClick={() => onClose()} style={{ width: '100%' }} color="light" fill="clear">
                            <IonLabel style={{ color: 'black' }}><b>Quit</b></IonLabel>
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton>
                            <IonTitle>{type} Quiz</IonTitle>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <br></br>
            <h2>Question #{currentQuestion + 1}</h2>
            <MultipleChoiceQ  onAnswer={handleAnswer}/>
            <IonFooter style={{ position: 'fixed', bottom: '0'}}>
                <IonToolbar color="tertiary">
                    <IonProgressBar color="success" value={(currentQuestion + 1) / totalQuestions}></IonProgressBar>
                </IonToolbar>
            </IonFooter>  
        </div>
    );
};

export default Quiz;