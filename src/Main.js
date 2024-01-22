import React, { useState, useEffect } from 'react';
import '@ionic/react/css/core.css';
import Loading from './Loading';
import App from './App';
import { setupIonicReact } from '@ionic/react';
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "./useSQLiteDB";

setupIonicReact();

type SQLItem = {
    id: number;
    name: string;
};

function Main() {

    const [isLoading, setIsLoading] = useState(true);

    const { performSQLAction, initialized } = useSQLiteDB();

    useEffect(() => {

        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => {
            clearTimeout(loadingTimeout)
        };


    }, []);

    useEffect(() => {
        loadData();
    }, [initialized]);

    /**
     * do a select of the database
     */
    const loadData = async () => {
        try {
            // query db
            performSQLAction(async (db) => {
                const respSelect = await db?.query(`SELECT * FROM test`);
                console.log(respSelect)
                addItem();
                const respSelect1 = await db?.query(`SELECT * FROM test`);
                console.log(respSelect1)
            });
        } catch (error) {
            alert((error).message);
        }
    };

    const addItem = async () => {
        try {
            // add test record to db
            performSQLAction(
                async (db) => {
                    await db?.query(`INSERT INTO test (id,name) values (?,?);`, [
                        Date.now(),
                        'luis'
                    ]);
                },
            );
        } catch (error) {
            alert((error).message);
        }
    };

    return (

        <div className="App">
            {isLoading ? (<Loading />) : (<App/>)}
        </div>
    );
}

export default Main;
