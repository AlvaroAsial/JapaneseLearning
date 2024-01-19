import React, { useState, useEffect } from 'react';
import '@ionic/react/css/core.css';
import Loading from './Loading';
import App from './App';
import { setupIonicReact } from '@ionic/react';

setupIonicReact();

function Main() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => {
            clearTimeout(loadingTimeout)
        };


    }, []);

    return (

        <div className="App">
            {isLoading ? (<Loading />) : (<App/>)}
        </div>
    );
}

export default Main;
