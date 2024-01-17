import React, { useState } from 'react';
import SectionDivider from './../components/SectionDivider'
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import n5Kanji from '../jsonData/kanjiData';
import GridItem from '../containers/GridItem';
import KanjiItemScreen from '../components/KanjiItemScreen';

const itemsPerRow = 4;

const Kanji = () => {

    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const handleGridItemClick = (character) => {
        setSelectedCharacter(character);
    };

    const handleCloseItem = () => {
        setSelectedCharacter(null);
    };

    return (
        <div className="kanji mainSection">
            <h1>Kanji</h1>
            <SectionDivider />
            <IonGrid>
                {n5Kanji &&
                    n5Kanji.kanji.reduce((rows, item, index) => {
                        if (index % itemsPerRow === 0) {
                            rows.push([]);
                        }
                        rows[rows.length - 1].push(item);
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <IonRow key={rowIndex}>
                            {row.map((item, colIndex) => (
                                <IonCol key={colIndex}>
                                    <GridItem character={item.character} onClick={handleGridItemClick} />
                                </IonCol>
                            ))}
                        </IonRow>
                    ))
                }
            </IonGrid>
            {selectedCharacter !== null && < KanjiItemScreen
                isOpen={selectedCharacter !== null}
                onClose={handleCloseItem}
                character={selectedCharacter?.character}
                pronunciation={selectedCharacter?.pronunciation}
            />}
        </div>
    );
};

export default Kanji;