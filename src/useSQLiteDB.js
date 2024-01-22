import { useEffect, useRef, useState } from "react";
import {
    SQLiteDBConnection,
    SQLiteConnection,
    CapacitorSQLite,
} from "@capacitor-community/sqlite";

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

    /**
     * here is where you cna check and update table
     * structure
     */
    const initializeTables = async () => {
        performSQLAction(async (db) => {
            const queryCreateTable = `
      CREATE TABLE IF NOT EXISTS test (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL
      );
    `;
            const respCT = await db?.execute(queryCreateTable);
            console.log(`res: ${JSON.stringify(respCT)}`);
        });
    };

    return { performSQLAction, initialized };
};

export default useSQLiteDB;