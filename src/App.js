import Hiragana from './containers/Hiragana';
import Katakana from './containers/Katakana';
import Kanji from './containers/Kanji';
import './App.css';
import { useSwipeable } from 'react-swipeable';
import React, { useState} from 'react';
import '@ionic/react/css/core.css';
import { IonFooter, IonToolbar, IonButton, IonLabel, IonAlert, IonApp, IonSegment, IonSegmentButton, IonIcon } from '@ionic/react';
import Quiz from './containers/quiz/Quiz';
import Settings from './containers/Settings';
import { settings } from 'ionicons/icons';
import { DarkModeProvider, useDarkMode } from './containers/DarkModeContext';
function App({ katakanaData, hiraganaData, kanjiData, reload, currentPageInherited, restart}) {


    const [activeQuiz, setActiveQuiz] = useState(false);
    const [quizLoading, setQuizLoading] = useState([false, 5]);
    const pages = ['hiragana', 'katakana', 'kanji', 'settings'];
    const [currentPage, setCurrentPage] = useState(currentPageInherited);

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

    const filterQuizData = (data) => {
        return data.filter(item => item.level > 0);
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
        <DarkModeProvider><IonApp>        <div className="App" {...handleSwipe}>
            {!activeQuiz && currentPage === 'hiragana' && <Hiragana data={hiraganaData.values} />}
            {!activeQuiz && currentPage === 'katakana' && <Katakana data={katakanaData.values} />}
            {!activeQuiz && currentPage === 'kanji' && <Kanji data={kanjiData.values} />}
            {!activeQuiz && currentPage === 'settings' && <Settings restart={restart} />}
            {!activeQuiz && (
                <IonFooter style={{ position: 'fixed', bottom: '0', width: 'inherit' }}>
                    {currentPage !== "settings" && <IonToolbar id="quizbtn">
                        <IonButton  onClick={startQuiz} style={{ width: '100%' }} color="light" fill="clear">
                            <IonLabel style={{ color: 'black' }}><b>Quiz {currentPage}</b></IonLabel>
                        </IonButton>
                    </IonToolbar>}
                    <IonSegment color="primary" value={currentPage} style={{ height: '100px' }}>
                        <IonSegmentButton value="hiragana" onClick={() => setCurrentPage("hiragana")} >
                            <b> あ</b>
                        </IonSegmentButton>
                        <IonSegmentButton value="katakana" onClick={() =>  setCurrentPage("katakana")}>
                        <b>ア</b>
                        </IonSegmentButton>
                        <IonSegmentButton value="kanji" onClick={() =>  setCurrentPage("kanji")}>
                        <b>川</b>
                        </IonSegmentButton>
                        <IonSegmentButton value="settings" onClick={() => setCurrentPage("settings")}>
                            <IonIcon icon={settings}></IonIcon>
                        </IonSegmentButton>
                    </IonSegment>
                </IonFooter>

            )}
            {activeQuiz && (
                <Quiz
                    type={currentPage}
                    data={currentPage === "hiragana" ? filterQuizData(hiraganaData.values) : currentPage === "katakana" ? filterQuizData(katakanaData.values) : filterQuizData(kanjiData.values.filter(x => x.jlpt === quizLoading[1]))}
                    onClose={endQuiz}
                />
            )}
            {quizLoading[0] && renderKanji()}
        </div></IonApp></DarkModeProvider>

    );
}

export default App;
