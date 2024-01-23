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
            }, 1000);
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

    return (

        <div className="App">
            {isLoading ? (<Loading />) : (<App katakanaData={katakanaData} hiraganaData={hiraganaData} />)}
        </div>
    );
}

export default Main;
