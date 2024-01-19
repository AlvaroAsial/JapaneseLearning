import React, { useState } from 'react';
import { IonCol, IonGrid, IonRow} from '@ionic/react';
import QuizGridItem from './QuizGridItem';

const MultipleChoiceQ = ({ onAnswer,data }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleSelectAnswer = (selection) => {
        setSelectedAnswer(selection.character);
        setTimeout(() => {
            onAnswer();
        }, 500);
    };

    const renderAnswerButton = (option, index) => {
        const isCorrect = option === data.rightAnswer;
        const isSelected = selectedAnswer === option;
        console.log(selectedAnswer)
        return (
            <IonCol size="6" key={index}>
                <QuizGridItem character={option} borderC={isSelected ? (isCorrect ? 'green' : 'red') : '#ffffff'} onClick={selectedAnswer !== null ? ()=>null : handleSelectAnswer} />
            </IonCol>
        );
    };

    return (
        <div className="multiple-choice question">
            <div>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <div className="hiragana-display">
                                <h1>{data.character}</h1>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        {data.others.map((option, index) => renderAnswerButton(option, index))}
                    </IonRow>
                </IonGrid>
            </div>
        </div>
    );
};

export default MultipleChoiceQ;