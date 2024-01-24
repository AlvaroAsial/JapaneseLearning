import React, { useState, useEffect } from 'react';
import '@ionic/react/css/core.css';
import Loading from './Loading';
import App from './App';
import useSQLiteDB from "./useSQLiteDB";

function Main() {

    const [isLoading, setIsLoading] = useState(true);
    const { performSQLAction, initialized } = useSQLiteDB();
    const [katakanaData, setKatakanaData] = useState({});
    const [hiraganaData, setHiraganaData] = useState({});
    const [kanjiData, setKanjiData] = useState({});
    const [currentPage, setCurrentPage] = useState('hiragana');

    useEffect(() => {
        if (initialized) {
            loadData("full");
            const loadingTimeout = setTimeout(() => {
                setIsLoading(false);
            }, 1000);
            return () => {
                clearTimeout(loadingTimeout)
            };
        }
    }, [initialized]);

    const loadData = async (mode) => {
        try {
            performSQLAction(async (db) => {
                const tables = JSON.stringify(await db?.query(`SELECT name FROM sqlite_schema WHERE type ='table'`));
                console.log('Tables in db: ' + tables)
                const hiragana = JSON.stringify(await db?.query(`Select * from charProgressionHiragana`));
                console.log('Hiragana Table: ' + hiragana)
                const katakana = JSON.stringify(await db?.query(`Select * from charProgressionKatakana`));
                console.log('Katakana Table: ' + katakana)
                const kanji = JSON.stringify(await db?.query(`Select * from charProgressionKanji`));
                console.log('Kanji Table: ' + kanji)
                setKatakanaData(JSON.parse(katakana))
                setHiraganaData(JSON.parse(hiragana))
                setKanjiData(JSON.parse(kanji))
            });
        } catch (error) {
            console.log((error).message);
        }
    };

    const reload = async (userResponses, currentPage) => {
        setIsLoading(true);
        console.log(userResponses)
        try {
            await performSQLAction(async (db) => {
                for (let i = 0; i < userResponses.length; i++) {
                    if (userResponses[i][1] === undefined) continue;
                    let count = "+1"
                    if (!userResponses[i][1]) count = "-1"
                    console.log(`UPDATE charProgression${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} SET level = level ${count} WHERE character = '${userResponses[i][0]}' or pronunciation = '${userResponses[i][0]}' and level < 20 and level > 1;`)
                    await db?.query(`UPDATE charProgression${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} SET level = level ${count} WHERE character = '${userResponses[i][0]}' or pronunciation = '${userResponses[i][0]}' and level < 20 and level > 1;`);
                }
            });
        } catch (error) {
            console.log((error).message);
        }
        await loadData(currentPage);
        setIsLoading(false)
    };

    return (

        <div className="App">
            {isLoading ? (<Loading />) : (<App katakanaData={katakanaData} hiraganaData={hiraganaData} kanjiData={kanjiData} currentPage={currentPage} setCurrentPage={setCurrentPage} reload={reload} />)}
        </div>
    );
}

export default Main;
