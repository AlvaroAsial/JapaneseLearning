import React from 'react';
import { IonProgressBar , IonButton } from '@ionic/react';


const QuizOver = ({ userResponses, onClose, totalQuestions }) => {
    console.log(userResponses)
    return (
        <div className="fullscreen-modal-overlay">
            <div className="fullscreen-modal-content">
                <h2>Quiz Over!</h2>
                <p>
                    {`You got ${userResponses.reduce((counter, value) => {
                        if (value[1]) counter++;
                        return counter;
                    }, 0)} out of ${totalQuestions} correct!`}
                </p>
                <IonProgressBar color="success" value={userResponses.reduce((counter, value) => {
                    if (value[1]) counter++;
                    return counter;
                }, 0) / totalQuestions}> </IonProgressBar>
                <IonButton color='primary' onClick={() => onClose()}>Exit</IonButton>
            </div>
        </div>
    );
};

export default QuizOver;