import React, { useState } from 'react';
import { IonCol, IonGrid, IonRow, IonButton } from '@ionic/react';
import QuizGridItem from './QuizGridItem';

const LinkingQ = ({ onAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const checkRightAnswer = (answer, rightAnswer) => {

    }

    const handleSelectAnswer = (answer) => {
        checkRightAnswer(answer,1)
        setSelectedAnswer(answer);
        onAnswer();
    };

    const options = [1,2,3,4,5]
    return (
        <div className="linking question">
            <div>
            <IonGrid>
                {options.map((option, colIndex) => (
                        <IonRow key={colIndex}>
                        <IonCol>
                            <QuizGridItem character={option} onClick={handleSelectAnswer} adjHeight='20px' />
                                </IonCol>
                        <IonCol>
                            <QuizGridItem character={option + 1} onClick={handleSelectAnswer} adjHeight='20px' />
                                </IonCol>
                        </IonRow>
                    ))
                }
            </IonGrid>
            </div>
        </div>
    );
};

export default LinkingQ;