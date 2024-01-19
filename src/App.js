import Hiragana from './containers/Hiragana';
import Katakana from './containers/Katakana';
import Kanji from './containers/Kanji';
import './App.css';
import { useSwipeable } from 'react-swipeable';
import React, { useState, useEffect} from 'react';
import '@ionic/react/css/core.css';
import {  IonFooter, IonToolbar, IonButton,  IonLabel } from '@ionic/react';
import Quiz from './containers/quiz/Quiz';
import hiraganaData from './jsonData/hiraganaData';
import katakanaData from './jsonData/katakanaData';

function App() {

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
    }, []);
   
    const startQuiz = () => {
        setActiveQuiz(true)
    }

    const endQuiz = () => {
        setActiveQuiz(false)
    }

    return (

        <div className="App" {...handleSwipe}>
            {!activeQuiz && currentPage === 'hiragana' && <Hiragana data={hiraganaData} />}
            {!activeQuiz && currentPage === 'katakana' && <Katakana data={katakanaData} />}
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
                        data={currentPage === "hiragana" ? hiraganaData : katakanaData}
                    onClose={endQuiz}
                />
            )}
        </div>
    );
}

export default App;
