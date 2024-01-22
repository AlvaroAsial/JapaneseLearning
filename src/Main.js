import React, { useState, useEffect } from 'react';
import '@ionic/react/css/core.css';
import Loading from './Loading';
import App from './App';
import { setupIonicReact } from '@ionic/react';
import useSQLiteDB from "./useSQLiteDB";

setupIonicReact();

function Main() {

    const [isLoading, setIsLoading] = useState(true);
    const { performSQLAction, initialized } = useSQLiteDB();

    useEffect(() => {
        if (initialized) {
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
                const respSelect = await db?.query(`SELECT name FROM sqlite_schema WHERE type ='table'`);
                console.log(respSelect)
                const respSelect2 = await db?.query(`Select * from charProgressionHiragana`);
                console.log('here')
                console.log(respSelect2)
                const respSelect3 = await db?.query(`Select * from charProgressionKatakana`);
                console.log(respSelect3)
            });
        } catch (error) {
            console.log((error).message);
        }
    };



    return (

        <div className="App">
            {isLoading ? (<Loading />) : (<App/>)}
        </div>
    );
}

export default Main;
