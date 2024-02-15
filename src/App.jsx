import Hiragana from './containers/Hiragana';
import Katakana from './containers/Katakana';
import Kanji from './containers/Kanji';
import './App.css';
import { useSwipeable } from 'react-swipeable';
import React, { useState } from 'react';
import '@ionic/react/css/core.css';
import { IonFooter, IonToolbar, IonButton, IonLabel, IonAlert, IonApp, IonSegment, IonSegmentButton, IonIcon } from '@ionic/react';
import Quiz from './containers/quiz/Quiz';
import Settings from './containers/Settings';
import { settings } from 'ionicons/icons';
import { useDarkMode } from './containers/DarkModeContext';
function App({ katakanaData, hiraganaData, kanjiData, reload, currentPageInherited, restart}) {

    const [activeQuiz, setActiveQuiz] = useState(false);
    const [quizLoading, setQuizLoading] = useState([false, 5]);
    const pages = ['hiragana', 'katakana', 'kanji', 'settings'];
    const [currentPage, setCurrentPage] = useState(currentPageInherited);
    const { darkMode } = useDarkMode();

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
   
    const startQuiz = () => {
        if (currentPage !== "kanji") setActiveQuiz(true);
        else {
            setQuizLoading([true,5]);
        }
    }

    const endQuiz = (userResponses) => {
        setActiveQuiz(false)
        reload(userResponses, currentPage)
    }

    const filterQuizData = () => {
        switch (currentPage) {
            case "hiragana":
                return hiraganaData.values.filter(item => item.level > 0);
            case "katakana":
                return katakanaData.values.filter(item => item.level > 0);
            case "kanji":
                return kanjiData.values.filter(x => x.jlpt === quizLoading[1]).filter(item => item.level > 0);
            default:
                break
        }
    }

    const startKanji = (alertData) => {
        var value = alertData === undefined ? 5 : alertData;
        setQuizLoading([false,value]);
        setActiveQuiz(true)
    }

    const renderKanji = () => {
        return (< IonAlert
            isOpen={quizLoading[0]}
            header="Select quiz type"
            buttons={[
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        setQuizLoading([false, 5])
                    },
                },
                {
                    text: 'OK',
                    role: 'confirm',
                    handler: (alertData) => {
                        startKanji(alertData);
                    }
                }
            ]}
            inputs={[
                {
                    label: 'N5',
                    type: 'radio',
                    value: 5
                },
                {
                    label: 'N4',
                    type: 'radio',
                    value: 4
                }
            ]}
        ></IonAlert>);
    }

    return (
            <IonApp>        <div className="App"  {...handleSwipe}>
            {!activeQuiz && currentPage === 'hiragana' && <Hiragana data={hiraganaData.values} />}
            {!activeQuiz && currentPage === 'katakana' && <Katakana data={katakanaData.values} />}
            {!activeQuiz && currentPage === 'kanji' && <Kanji data={kanjiData.values} />}
            {!activeQuiz && currentPage === 'settings' && <Settings restart={restart} />}
            {!activeQuiz && (
                <IonFooter style={{ position: 'fixed', bottom: '0', width: 'inherit' }}>
                    {currentPage !== "settings" && <IonToolbar id="quizbtn">
                        <IonButton onClick={startQuiz} style={{ width: '100%' }} id="quizbtn"  fill="clear">
                            <IonLabel style={{ color: 'black' }}><b>Quiz {currentPage}</b></IonLabel>
                        </IonButton>
                    </IonToolbar>}
                    <IonSegment color="primary" className={darkMode ? 'dark-segment' : 'light-segment'} value={currentPage} style={{ height: '100px' }}>
                        <IonSegmentButton value="hiragana" style={{width:'90%', height: '90%' }} onClick={() => setCurrentPage("hiragana")} >
                            <b> あ</b>
                        </IonSegmentButton>
                        <IonSegmentButton value="katakana" style={{ width: '90%', height: '90%' }} onClick={() =>  setCurrentPage("katakana")}>
                        <b>ア</b>
                        </IonSegmentButton>
                        <IonSegmentButton value="kanji" style={{ width: '90%', height: '90%' }} onClick={() =>  setCurrentPage("kanji")}>
                        <b>川</b>
                        </IonSegmentButton>
                        <IonSegmentButton value="settings" style={{ width: '90%', height: '90%' }} onClick={() => setCurrentPage("settings")}>
                            <IonIcon icon={settings}></IonIcon>
                        </IonSegmentButton>
                    </IonSegment>
                </IonFooter>

            )}
            {activeQuiz && (
                <Quiz
                    type={currentPage}
                    data={filterQuizData()}
                    onClose={endQuiz}
                />
            )}
            {quizLoading[0] && renderKanji()}
        </div></IonApp>

    );
}

export default App;
