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

    useEffect(() => {
        if (initialized) {
            console.log('AH')
            loadData();
            const loadingTimeout = setTimeout(() => {
                setIsLoading(false);
            }, 5000);
            return () => {
                clearTimeout(loadingTimeout)
            };
        }
    }, [initialized]);

    const loadData = async () => {
        try {
            performSQLAction(async (db) => {
                const tables = JSON.stringify(await db?.query(`SELECT name FROM sqlite_schema WHERE type ='table'`));
                console.log('Tables in db: ' + tables)
                const hiragana = JSON.stringify(await db?.query(`Select * from charProgressionHiragana`));
                console.log('Hiragana Table: ' + hiragana)
                const katakana = JSON.stringify(await db?.query(`Select * from charProgressionKatakana`));
                console.log('Katakana Table: ' + katakana)
                setKatakanaData(JSON.parse(katakana))
                setHiraganaData(JSON.parse(hiragana))
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
                    console.log(`UPDATE charProgression${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} SET level = level ${count} WHERE character = '${userResponses[i][0]}' or pronunciation = '${userResponses[i][0]}' and level < 20 and level > 0;`)
                    await db?.query(`UPDATE charProgression${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} SET level = level ${count} WHERE character = '${userResponses[i][0]}' or pronunciation = '${userResponses[i][0]}' and level < 20 and level > 0;`);
                    const hiragana = JSON.stringify(await db?.query(`Select * from charProgressionHiragana`));
                    console.log('Hiragana Table: ' + hiragana)
                }
            });
        } catch (error) {
            console.log((error).message);
        }
        await loadData();
        setIsLoading(false)
    };

    return (

        <div className="App">
            {isLoading ? (<Loading />) : (<App katakanaData={katakanaData} hiraganaData={hiraganaData} reload={reload} />)}
        </div>
    );
}

export default Main;
