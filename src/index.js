import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Main';
import "@fontsource/montserrat";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/400-italic.css"; 
import { Capacitor } from "@capacitor/core";
import { CapacitorSQLite, SQLiteConnection} from "@capacitor-community/sqlite";
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";
import { setupIonicReact } from '@ionic/react';

setupIonicReact();

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const platform = Capacitor.getPlatform();
        if (platform === "web") {
            const sqlite = new SQLiteConnection(CapacitorSQLite);
            customElements.define("jeep-sqlite", JeepSqlite);
            const jeepSqliteEl = document.createElement("jeep-sqlite");
            document.body.appendChild(jeepSqliteEl);
            await customElements.whenDefined("jeep-sqlite");
            console.log(`after customElements.whenDefined`);
            await sqlite.initWebStore();
            console.log(`after initWebStore`);
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        console.log("Rendering Main from Index")
        root.render(
                <Main />
        );
    } catch (e) {
        console.log(e);
    }
});

