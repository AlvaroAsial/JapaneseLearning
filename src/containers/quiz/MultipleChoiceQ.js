import React, { useState } from 'react';
import { IonCol, IonGrid, IonRow, IonButton } from '@ionic/react';
import QuizGridItem from './QuizGridItem';

const MultipleChoiceQ = ({ onAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const checkRightAnswer = (answer, rightAnswer) => {

    }

    const handleSelectAnswer = (answer) => {
        checkRightAnswer(answer,1)
        setSelectedAnswer(answer);
        onAnswer();
    };

    const options = [1,2,3,4]
    return (
        <div className="multiple-choice question">
            <div>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <div className="hiragana-display">
                                <h1>{1}</h1>
                            </div>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        {options.map((option, index) => (
                            <IonCol size="6" key={index}>
                                <QuizGridItem character={option} onClick={handleSelectAnswer} />
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </div>
        </div>
    );
};

export default MultipleChoiceQ;