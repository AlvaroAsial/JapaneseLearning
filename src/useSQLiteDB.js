import { useEffect, useRef, useState } from "react";
import { SQLiteConnection, CapacitorSQLite, } from "@capacitor-community/sqlite";
import katakanaData from "./jsonData/katakanaData";
import hiraganaData from "./jsonData/hiraganaData";
import { n4Kanji, n5Kanji } from "./jsonData/kanjiData";

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
            initializeTables().then(() => setInitialized(true));
        });
    }, []);

    const initializeTables = async () => {
        await performSQLAction(async (db) => {
            const queryCreateTable = `
            CREATE TABLE IF NOT EXISTS charProgressionHiragana (
            character TEXT PRIMARY KEY NOT NULL,
            level INTEGER NOT NULL,
            pronunciation TEXT
            );`;
            await db?.execute(queryCreateTable);
        });

        try {
            await performSQLAction(
                async (db) => {
                    const respSelect2 = await db?.query(`SELECT * FROM charProgressionHiragana`);
                    if (respSelect2 !== undefined && respSelect2.values.length === 0) {
                        const values = hiraganaData.map(element => `('${element.character}', ${element.level}, '${element.pronunciation}')`).join(',');
                        try {
                            await performSQLAction(
                                async (db) => {
                                    await db?.query(`INSERT INTO charProgressionHiragana (character,level, pronunciation) VALUES ${values};`);
                                },
                            );
                        } catch (error) {
                            console.log((error).message);
                        }
                    }
                },
            );
        } catch (error) {
            console.log((error).message);
        }
        await performSQLAction(async (db) => {
            const queryCreateTable = `
            CREATE TABLE IF NOT EXISTS charProgressionKatakana (
            character TEXT PRIMARY KEY NOT NULL,
            level INTEGER NOT NULL,
            pronunciation TEXT
            );
        `;
            await db?.execute(queryCreateTable);
        });
        try {
            await performSQLAction(
                async (db) => {
                    const respSelect2 = await db?.query(`SELECT * FROM charProgressionKatakana`);
                    if (respSelect2 !== undefined && respSelect2.values.length === 0) {
                        const values = katakanaData.map(element => `('${element.character}', ${element.level},'${element.pronunciation}')`).join(',');
                        try {
                            await performSQLAction(
                                async (db) => {
                                    await db?.query(`INSERT INTO charProgressionKatakana (character,level,pronunciation) VALUES ${values};`);
                                },
                            );
                        } catch (error) {
                            console.log((error).message);
                        }
                    }
                },
            );
        } catch (error) {
            console.log((error).message);
        }

        await performSQLAction(async (db) => {
            const queryCreateTable = `
            CREATE TABLE IF NOT EXISTS charProgressionKanji (
            character TEXT PRIMARY KEY NOT NULL,
            level INTEGER NOT NULL,
            jlpt INTEGER NOT NULL,
            pronunciation TEXT NOT NULL
            );
        `;
            await db?.execute(queryCreateTable);
        });
        try {
            await performSQLAction(
                async (db) => {
                    const respSelect2 = await db?.query(`SELECT * FROM charProgressionKanji`);
                    if (respSelect2 !== undefined && respSelect2.values.length === 0) {
                        var values = Object.keys(n5Kanji).slice(0, 5).map(element => `('${element}', 1,5,'${n5Kanji[element].meanings[0]}')`).join(',');
                        values += ','
                        values += Object.keys(n5Kanji).slice(5).map(element => `('${element}', 0,5,'${n5Kanji[element].meanings[0]}')`).join(',');
                        values += ','
                        values += Object.keys(n4Kanji).slice(0, 5).map(element => `('${element}', 1,4,'${n4Kanji[element].meanings[0]}')`).join(',');
                        values += ','
                        values += Object.keys(n4Kanji).slice(5).map(element => `('${element}', 0,4,'${n4Kanji[element].meanings[0]}')`).join(',');
                        try {
                            await performSQLAction(
                                async (db) => {
                                    await db?.query(`INSERT INTO charProgressionKanji (character,level,jlpt,pronunciation) VALUES ${values};`);
                                },
                            );
                        } catch (error) {
                            console.log((error).message);
                        }
                    }
                },
            );
        } catch (error) {
            console.log((error).message);
        }
    };

    const performSQLAction = async (
        action,
        cleanup
    ) => {
        try {
            await db.current?.open();
            await action(db.current);
        } catch (error) {
            console.log((error));
        } finally {
            try {
                (await db.current?.isDBOpen())?.result && (await db.current?.close());
                cleanup && (await cleanup());
            } catch { }
        }
    };

    const dropTables = async () => {
        await performSQLAction(async (db) => {
            const queryDropTable = `
            DROP TABLE IF EXISTS charProgressionKanji;;
            DROP TABLE IF EXISTS charProgressionKatakana;;
            DROP TABLE IF EXISTS charProgressionHiragana;`;
            await db?.execute(queryDropTable);
        });
    };

    const restartDB = async () => {
        try {
            setInitialized(false)
            await dropTables();
            await initializeTables();
            setInitialized(true)
        } catch (error) {
            console.log((error));
        } 
    };




    return { performSQLAction, initialized, restartDB };
};

export default useSQLiteDB;