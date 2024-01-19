import React, { useState } from 'react';
import MultipleChoiceQ from './MultipleChoiceQ';
import { IonProgressBar, IonFooter, IonHeader, IonTitle, IonToolbar, IonButtons, IonLabel, IonButton } from '@ionic/react';
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
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomEntry = data[randomIndex];
        const correctPronunciation = randomEntry.pronunciation;
        const uniquePronunciations = data.map(entry => entry.pronunciation).filter(p => p !== correctPronunciation);
        const otherPronunciations = QuizHelpers.shuffleArray(uniquePronunciations).slice(0, 3);
        return {
            character: randomEntry.character,
            rightAnswer: correctPronunciation,
            others: QuizHelpers.shuffleArray(otherPronunciations.concat(correctPronunciation))
        };
    }

    const setupMultipleChoiceQReverse = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomEntry = data[randomIndex];
        const correctCharacter = randomEntry.character;
        const uniqueCharacters = data.map(entry => entry.character).filter(p => p !== correctCharacter);
        const otherCharacters = QuizHelpers.shuffleArray(uniqueCharacters).slice(0, 3);
        return {
            character: randomEntry.pronunciation,
            rightAnswer: correctCharacter,
            others: QuizHelpers.shuffleArray(otherCharacters.concat(correctCharacter))
        };
    }

    const setupDoubleCharacterQ = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomEntry = data[randomIndex];
        const correctPronunciation1 = randomEntry.pronunciation;
        let randomIndex2 = randomIndex;
        while (randomIndex2 === randomIndex) {
            randomIndex2 = Math.floor(Math.random() * data.length);
        }
        const randomEntry2 = data[randomIndex2];
        const correctPronunciation2 = randomEntry2.pronunciation;
        const uniquePronunciations = data.map(entry => entry.pronunciation);
        let rest = QuizHelpers.shuffleArray(uniquePronunciations).slice(0, 6);
        rest = [rest[0] + rest[1], rest[2] + rest[3], rest[4] + rest[5]]

        return {
            character: randomEntry.character + randomEntry2.character,
            rightAnswer: correctPronunciation1 + correctPronunciation2,
            others: QuizHelpers.shuffleArray(rest.concat(correctPronunciation1 + correctPronunciation2))
        };
    };

    const setupLinkingQ = () => {
        const clonedArray = data.slice();
        return QuizHelpers.shuffleArray(clonedArray).slice(0, 5);
    }

    const renderQuestion = () => {
        switch (currentQuestion % 4) {
            case 0:
                return <MultipleChoiceQ key={currentQuestion} onAnswer={handleAnswer} data={setupMultipleChoiceQ()} />;
            case 1:
                return <LinkingQ key={currentQuestion} onAnswer={handleAnswer} data={setupLinkingQ() } />;
            case 2:
                return <MultipleChoiceQ key={currentQuestion} onAnswer={handleAnswer} data={setupMultipleChoiceQReverse()} />;
            case 3:
                return <MultipleChoiceQ key={currentQuestion} onAnswer={handleAnswer} data={setupDoubleCharacterQ()} />;
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