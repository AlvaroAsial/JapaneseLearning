import React, { useState, useEffect } from 'react';
import MultipleChoiceQ from './MultipleChoiceQ';
import { IonModal, IonProgressBar, IonIcon, IonFooter, IonHeader, IonTitle, IonToolbar, IonButtons, IonLabel, IonButton } from '@ionic/react';
import LinkingQ from './LinkingQ';
import * as QuizHelpers from './QuizHelpers';

const Quiz = ({ type, data, onClose }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userResponses, setUserResponses] = useState([]);
    const totalQuestions = 10;

    const handleAnswer = () => {
        setUserResponses([...userResponses, 1]);
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            onClose();
        }
    };

    const setupMultipleChoiceQ = () => {
        const randomIndex = Math.floor(Math.random() * data.hiragana.length);
        const randomEntry = data.hiragana[randomIndex];
        const correctPronunciation = randomEntry.pronunciation;
        const uniquePronunciations = data.hiragana.map(entry => entry.pronunciation).filter(p => p !== correctPronunciation);
        const otherPronunciations = QuizHelpers.shuffleArray(uniquePronunciations).slice(0, 3);
        return {
            character: randomEntry.character,
            rightAnswer: correctPronunciation,
            others: QuizHelpers.shuffleArray(otherPronunciations.concat(correctPronunciation))
        };
    }

    const renderQuestion = () => {
        switch (currentQuestion % 2) {
            case 0:
                const mcData = setupMultipleChoiceQ()
                return <MultipleChoiceQ onAnswer={handleAnswer} data={mcData} />;
            case 1:
                return <LinkingQ onAnswer={handleAnswer} />;
            default:
                return null;
        }
    };

    return (
        <div className="Quiz slideleft" style={{ height: '100vh' }}>
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
            {renderQuestion()}
            <IonFooter style={{ position: 'fixed', bottom: '0'}}>
                <IonToolbar color="tertiary">
                    <IonProgressBar color="success" value={(currentQuestion + 1) / totalQuestions}></IonProgressBar>
                </IonToolbar>
            </IonFooter>  
        </div>
    );
};

export default Quiz;