import React, { useState, useEffect } from 'react';
import '@ionic/react/css/core.css';
import Loading from './Loading';
import App from './App';
import useSQLiteDB from './useSQLiteDB';
import { DarkModeProvider } from './containers/DarkModeContext';

function Main() {

    const [isLoading, setIsLoading] = useState(true);
    const { performSQLAction, initialized ,restartDB } = useSQLiteDB();
    const [katakanaData, setKatakanaData] = useState({});
    const [hiraganaData, setHiraganaData] = useState({});
    const [kanjiData, setKanjiData] = useState({});
    const [currentPage, setCurrentPage] = useState('hiragana');

    useEffect(() => {
        const loadDataAsync = async () => {
            await loadData();
            setIsLoading(false);
        };
        if (initialized) {
            loadDataAsync();
        }
    }, [initialized]);

    const loadData = async () => {
        try {
            performSQLAction(async (db) => {
                const hiragana = JSON.stringify(await db?.query(`SELECT * FROM charProgressionHiragana`));
                const katakana = JSON.stringify(await db?.query(`SELECT * FROM charProgressionKatakana`));
                const kanji = JSON.stringify(await db?.query(`SELECT * FROM charProgressionKanji`));
                setKatakanaData(JSON.parse(katakana))
                setHiraganaData(JSON.parse(hiragana))
                setKanjiData(JSON.parse(kanji))
            });
        } catch (error) {
            console.log((error).message);
        }
    };

    /* Checks if the sum of current levels across all characters of a specific type, divided by the number of unlocked characters, is larger than 10.
    If so, it unlocks 5 additional characters */
    const doUnlockCharactersIfNewLevel = async (table) => {
        try {
            await performSQLAction(async (db) => {
                const unlockedCount = await db?.query(`SELECT count(*) AS count FROM ${table} WHERE level > 0`);
                const levelCount = await db?.query(`SELECT sum(level) AS count FROM ${table} WHERE level > 0`);
                if ((levelCount.values[0].count / unlockedCount.values[0].count) > 10) {
                    const newChars = await db?.query(`SELECT character FROM ${table} WHERE level = 0`);
                    const toUnlock = newChars.values.slice(0, 5)
                    for (let i = 0; i < toUnlock.length; i++) {
                        await db?.query(`UPDATE ${table} SET level = 1 WHERE character = '${toUnlock[i].character}' ;`);
                    }
                }
            });
        } catch (error) {
            console.log((error).message);
        }
    };

    const reload = async (userResponses, currentPage) => {
        setIsLoading(true);
        try {
            await performSQLAction(async (db) => {
                for (let i = 0; i < userResponses.length; i++) {
                    if (userResponses[i][1] === undefined) continue;
                    let count = ["+1",0,20]
                    if (!userResponses[i][1]) count = ["-1",1,21]
                    const table = `charProgression${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}`;
                    const addLevel = count[0];
                    const character = userResponses[i][0];
                    const pronunciation = userResponses[i][0];
                    const minLevel = count[1];
                    const maxLevel = count[2];
                    await db?.query(`UPDATE ${table}
                                        SET level = level ${addLevel}
                                      WHERE (character = '${character}' OR pronunciation = '${pronunciation}')
                                        AND ${minLevel} < level
                                        AND level < ${maxLevel};`);
                }
            });
        } catch (error) {
            console.log((error).message);
        }
        await doUnlockCharactersIfNewLevel(`charProgression${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}`);
        await loadData();
        setCurrentPage(currentPage);
        setIsLoading(false)
    };

    const restart = async () => {
        setIsLoading(true);
        await restartDB();
        setCurrentPage(currentPage);
        setIsLoading(false)
    };

    return (
        <DarkModeProvider>
            <div className="App">
                {isLoading ? (<Loading />) : (<App katakanaData={katakanaData} hiraganaData={hiraganaData} kanjiData={kanjiData} currentPageInherited={currentPage} reload={reload} restart={restart} />)}
            </div>
        </DarkModeProvider>
    );
}

export default Main;
