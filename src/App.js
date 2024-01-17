import Hiragana from './containers/Hiragana';
import Katakana from './containers/Katakana';
import Kanji from './containers/Kanji';
import './App.css';
import { useSwipeable } from 'react-swipeable';
import React, { useState, useEffect } from 'react';
import '@ionic/react/css/core.css';
import {  IonFooter, IonToolbar,IonTitle, setupIonicReact, IonButtons, IonButton, IonIcon, IonLabel } from '@ionic/react';
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css"; // Specify weight and style
import Quiz from './containers/quiz/Quiz';

setupIonicReact();

function App() {

    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('hiragana');
    const pages = ['hiragana', 'katakana', 'kanji'];

    const [activeQuiz, setActiveQuiz] = useState(false);

    const handleSwipe = useSwipeable({
        onSwipedLeft: () => {
            if (activeQuiz) return;
            const currentIndex = pages.indexOf(currentPage);
            const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : pages[0];
            setCurrentPage(nextPage);
        },
        onSwipedRight: () => {
            if (activeQuiz) return;
            const currentIndex = pages.indexOf(currentPage);
            const nextPage = currentIndex === 0 ? pages[pages.length - 1] : pages[currentIndex - 1];
            setCurrentPage(nextPage);
        }
    });

    const handleKeyPress = (event) => {
        if (event.key === 'ArrowRight') {
            const currentIndex = pages.indexOf(currentPage);
            const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : pages[0];
            setCurrentPage(nextPage);
        }
        else if (event.key === 'ArrowLeft') {
            const currentIndex = pages.indexOf(currentPage);
            const nextPage = currentIndex === 0 ? pages[pages.length - 1] : pages[currentIndex - 1];
            setCurrentPage(nextPage);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    });

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(loadingTimeout);
    }, []);
   
    const startQuiz = () => {
        setActiveQuiz(true)
    }

    const endQuiz = () => {
        setActiveQuiz(false)
    }

    return (

        <div className="App" {...handleSwipe}>
            {isLoading ? (
                // Display your loading screen or spinner during the loading period
                <div>
                    <h1>Loading...</h1>
                    {/* Add any loading animation or content here */}
                </div>
            ) : (
                // Render your app content once loading is complete
                <>
                    {!activeQuiz && currentPage === 'hiragana' && <Hiragana />}
                    {!activeQuiz && currentPage === 'katakana' && <Katakana />}
                    {!activeQuiz && currentPage === 'kanji' && <Kanji />}
                    {!activeQuiz && (
                        <IonFooter style={{ position: 'fixed', bottom: '0', width: 'inherit' }}>
                            <IonToolbar>
                                <IonButton onClick={startQuiz} style={{ width: '100%' }} color="light" fill="clear">
                                    <IonLabel style={{ color: 'black' }}><b>Quiz {currentPage}</b></IonLabel>
                                </IonButton>
                            </IonToolbar>
                        </IonFooter>
                    )}

                    {activeQuiz && (
                        <Quiz
                            type={currentPage}
                            isOpen={activeQuiz !== null}
                            onClose={endQuiz}
                            quit={endQuiz}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default App;
