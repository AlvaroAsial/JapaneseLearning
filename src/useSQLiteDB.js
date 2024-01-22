import { useEffect, useRef, useState } from "react";
import { SQLiteDBConnection, SQLiteConnection, CapacitorSQLite, } from "@capacitor-community/sqlite";
import katakanaData from "./jsonData/katakanaData";
import hiraganaData from "./jsonData/hiraganaData";

const useSQLiteDB = () => {
    const db = useRef();
    const sqlite = useRef();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const initializeDB = async () => {
            if (sqlite.current) return;

            sqlite.current = new SQLiteConnection(CapacitorSQLite);
            const ret = await sqlite.current.checkConnectionsConsistency();
            const isConn = (await sqlite.current.isConnection("db_vite", false))
                .result;

            if (ret.result && isConn) {
                db.current = await sqlite.current.retrieveConnection("db_vite", false);
            } else {
                db.current = await sqlite.current.createConnection(
                    "db_vite",
                    false,
                    "no-encryption",
                    1,
                    false
                );
            }
        };

        initializeDB().then(() => {
            initializeTables();
            setInitialized(true);
        });
    }, []);

    const performSQLAction = async (
        action,
        cleanup
    ) => {
        try {
            await db.current?.open();
            await action(db.current);
        } catch (error) {
            alert((error).message);
        } finally {
            try {
                (await db.current?.isDBOpen())?.result && (await db.current?.close());
                cleanup && (await cleanup());
            } catch { }
        }
    };

    const initializeTables = async () => {
        performSQLAction(async (db) => {
            const queryCreateTable = `
            CREATE TABLE IF NOT EXISTS charProgressionHiragana (
            character TEXT PRIMARY KEY NOT NULL,
            level INTEGER NOT NULL
            );`;
            const respCT3 = await db?.execute(queryCreateTable);
            console.log(`res: ${JSON.stringify(respCT3)}`);
            console.log(`charProgressionHiraganaCreatedOrAlive`);   
        });

        try {
            performSQLAction(
                async (db) => {
                    const respSelect2 = await db?.query(`Select * from charProgressionHiragana`);
                    if (respSelect2 !== undefined && respSelect2.values.length === 0) {
                        console.log('Setting up hiragana table')
                        const values = hiraganaData.map(element => `('${element.character}', 0)`).join(',');
                        /*try {
                            performSQLAction(
                                async (db) => {
                                    await db?.query(`INSERT INTO charProgressionHiragana (character,level) values ${values};`);
                                },
                            );
                        } catch (error) {
                            console.log((error).message);
                        } */

                    }
                },
            );
        } catch (error) {
            console.log((error).message);
        }
        performSQLAction(async (db) => {
            const queryCreateTable = `
            CREATE TABLE IF NOT EXISTS charProgressionKatakana (
            character TEXT PRIMARY KEY NOT NULL,
            level INTEGER NOT NULL
            );
        `;
            const respCT = await db?.execute(queryCreateTable);
            console.log(`res: ${JSON.stringify(respCT)}`);
            console.log(`charProgressionKatakanaCreatedOrAlive`);   
        });
        try {
            performSQLAction(
                async (db) => {
                    const respSelect2 = await db?.query(`Select * from charProgressionKatakana`);
                    if (respSelect2 !== undefined && respSelect2.values.length === 0) {
                        console.log('Setting up katakana table')
                        const values = hiraganaData.map(element => `('${element.character}', 0)`).join(',');
                        /*try {
                            performSQLAction(
                                async (db) => {
                                    await db?.query(`INSERT INTO charProgressionKatakana (character,level) values ${values};`);
                                },
                            );
                        } catch (error) {
                            console.log((error).message);
                        }*/

                    }
                },
            );
        } catch (error) {
            console.log((error).message);
        }
    };


    return { performSQLAction, initialized };
};

export default useSQLiteDB;