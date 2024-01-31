import React, { useState } from 'react';
import { IonCol, IonGrid, IonRow, IonContent } from '@ionic/react';
import SectionDivider from './../components/SectionDivider'
import GridItem from '../containers/GridItem';
import ItemScreen from '../components/ItemScreen';
import { useDarkMode } from './DarkModeContext';

const itemsPerRow = 4;

const Hiragana = ({data }) => {

    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const { darkMode } = useDarkMode();

    const handleGridItemClick = (character) => {
        setSelectedCharacter(character);
    };

    const handleCloseItem = () => {
        setSelectedCharacter(null);
    };

    return (
        <div className={darkMode ? 'mainSection dark' : 'mainSection light'}>
            <h1>Hiragana</h1>
            <SectionDivider />
            <IonContent>
            <IonGrid style={{ marginBottom: '200px' } }>
                {data &&
                    data.reduce((rows, item, index) => {
                        if (index % itemsPerRow === 0) {
                            rows.push([]);
                        }
                        rows[rows.length - 1].push(item);
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <IonRow key={rowIndex}>
                            {row.map((item, colIndex) => (
                                <IonCol key={colIndex}>
                                    <GridItem character={item.character} level={item.level} pronunciation={item.pronunciation} onClick={handleGridItemClick} />
                                </IonCol>
                            ))}
                        </IonRow>
                    ))
                }
                </IonGrid>
            </IonContent>
            {selectedCharacter !== null && < ItemScreen
                isOpen={selectedCharacter !== null}
                onClose={handleCloseItem}
                character={selectedCharacter?.character}
                pronunciation={selectedCharacter?.pronunciation}
                level={selectedCharacter?.level}
            />}
        </div>
    );
};

export default Hiragana;