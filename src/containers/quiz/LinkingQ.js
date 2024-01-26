import React, { useState } from 'react';
import { IonCol, IonGrid, IonRow, IonProgressBar } from '@ionic/react';
import QuizGridItem from './QuizGridItem';

const LinkingQ = ({ onAnswer,data }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [failAmount, setFailAmount] = useState(0);

    const checkSelectedAnswerOption = async (option) => {
        if (selectedCharacter === null || isAnsweredCorrectly(option.wrongCharacter)) return;
        if (selectedCharacter !== option.wrongCharacter) {
            setFailAmount(failAmount + 1);
            if (failAmount === 1) handleSelectAnswer({});
        } else {
            await setSelectedAnswers((prevAnswers) => Object.assign({}, prevAnswers, { [selectedCharacter]: option.wrongPronunciation }));
        }
        if (Object.keys(selectedAnswers).length === data.length - 1) {
            handleSelectAnswer(Object.assign(selectedAnswers, { [selectedCharacter]: option.wrongPronunciation }));
        }
        setSelectedCharacter(null);
    }

    const handleSelectCharacter = (option) => {
        if (!isAnsweredCorrectly(option.character)) setSelectedCharacter(option.character);
    };

    const isAnsweredCorrectly = (character) => {
        return character in selectedAnswers;
    };

    const handleSelectAnswer = (selection) => {
        const head = document.getElementById('linkhead')
        if (Object.keys(selection).length === data.length) {
            head.style.color = 'green'
            head.innerText = 'Correct!'
        }
        else {
            head.style.color = 'red'
            head.innerText = 'Wrong Answer!'
        }
        setTimeout(() => {
            // to fix
            onAnswer(data[0].character,Object.keys(selection).length === data.length);
        }, 500);
    };

    return (
        <div className="linking question">
            <div>
            <h3 id='linkhead'>Link the left characters to their respective sounds</h3>
            <IonGrid>
                {data.map((option, colIndex) => (
                        <IonRow key={colIndex}>
                            <IonCol>
                            <QuizGridItem
                                character={option.character}
                                onClick={() => handleSelectCharacter(option)}
                                adjHeight='20px'
                                borderC={isAnsweredCorrectly(option.character) ? '#000000' : selectedCharacter === option.character ? 'green' : '#ffffff'} />
                            </IonCol>
                            <IonCol>
                            <QuizGridItem
                                character={option.wrongPronunciation}
                                onClick={() => checkSelectedAnswerOption(option)}
                                adjHeight='20px'
                                borderC={isAnsweredCorrectly(option.wrongCharacter) ? '#000000' : '#ffffff'}  
                            />
                            </IonCol>
                        </IonRow>
                    ))
                }
            </IonGrid>
            </div>
            <h3>{2 - failAmount} mistakes allowed!</h3>
            <IonProgressBar color={failAmount === 0 ? 'success' : failAmount === 1 ? 'warning' : 'danger'} value={failAmount / 2}></IonProgressBar>
        </div>
    );
};

export default LinkingQ;