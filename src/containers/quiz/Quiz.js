import React, { useState } from 'react';
import MultipleChoiceQ from './MultipleChoiceQ';
import { IonProgressBar, IonFooter, IonHeader, IonTitle, IonToolbar, IonButtons, IonLabel, IonButton, IonAlert, IonModal } from '@ionic/react';
import LinkingQ from './LinkingQ';
import * as QuizHelpers from './QuizHelpers';

const Quiz = ({ type, data, onClose }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userResponses, setUserResponses] = useState([]);
    const [quizOver, setQuizOver] = useState(false);
    const totalQuestions = 5;

    const handleAnswer = (answer) => {
        setUserResponses([...userResponses, answer]);
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            console.log(userResponses)
            setQuizOver(true)
        }
    };

    const onClosetest = () => {
        setQuizOver(false);
        onClose();
    }

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
        let rest = QuizHelpers.shuffleArray(uniquePronunciations).slice(0, 5);
        rest = [rest[0] + rest[1], rest[2] + rest[3], rest[4] + rest[2]]

        return {
            character: randomEntry.character + randomEntry2.character,
            rightAnswer: correctPronunciation1 + correctPronunciation2,
            others: QuizHelpers.shuffleArray(rest.concat(correctPronunciation1 + correctPronunciation2))
        };
    };

    const setupLinkingQ = () => {
        const clonedArray = data.slice();
        const selected = QuizHelpers.shuffleArray(clonedArray).slice(0, 4);
        const shuffledOptions = QuizHelpers.shuffleArray(selected.slice())
        const a = selected.map(({ character, pronunciation }, idx) => ({ character: character, pronunciation: pronunciation, wrongCharacter: shuffledOptions[idx].character, wrongPronunciation: shuffledOptions[idx].pronunciation }))
        console.log(a)
        return a
    }

    const renderQuestion = () => {
        if (quizOver) return null;
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
                        <IonButton id="present-alert" style={{ width: '100%' }} color="light" fill="clear">
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
            <IonAlert cssClass='my-custom-class'
                header="Are you sure?"
                trigger="present-alert"
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
                            onClose();
                        },
                    },
                ]}
                onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
            ></IonAlert>
            {quizOver && 
                <div className="fullscreen-modal-overlay">
                    <div className="fullscreen-modal-content">
                        <h2>Quiz Over!</h2>
                        <p>
                            {`You got ${userResponses.reduce((counter, value) => {
                                if (value) counter++;
                                return counter; 
                            }, 0)} out of ${totalQuestions} correct!`}
                        </p>
                        <IonProgressBar color="success" value={userResponses.reduce((counter, value) => {
                            if (value) counter++;
                            return counter;
                        }, 0) / totalQuestions}> </IonProgressBar>
                        <IonButton color='primary' onClick={() => onClosetest()}>Exit</IonButton>
                    </div>
                </div>}
        </div>
    );
};

export default Quiz;