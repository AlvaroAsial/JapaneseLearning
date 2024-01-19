import React, { useState } from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import QuizGridItem from './QuizGridItem';

const LinkingQ = ({ onAnswer,data }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const checkRightAnswer = (answer, rightAnswer) => {

    }

    const handleSelectAnswer = (answer) => {
        checkRightAnswer(answer,1)
        setSelectedAnswer(answer);
        onAnswer();
    };

    return (
        <div className="linking question">
            <div>
            <IonGrid>
                {data.map((option, colIndex) => (
                        <IonRow key={colIndex}>
                        <IonCol>
                            <QuizGridItem character={option.character} onClick={handleSelectAnswer} adjHeight='20px' />
                                </IonCol>
                        <IonCol>
                            <QuizGridItem character={option.pronunciation} onClick={handleSelectAnswer} adjHeight='20px' />
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