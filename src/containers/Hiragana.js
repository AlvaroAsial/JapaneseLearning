import React, { useState } from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import SectionDivider from './../components/SectionDivider'
import GridItem from '../containers/GridItem';
import ItemScreen from '../components/ItemScreen';

const itemsPerRow = 4;

const Hiragana = ({data }) => {

    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const handleGridItemClick = (character) => {
        setSelectedCharacter(character);
    };

    const handleCloseItem = () => {
        setSelectedCharacter(null);
    };

    return (
        <div className="hiragana mainSection">
            <h1>Hiragana</h1>
            <SectionDivider/>
            <IonGrid>
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
                                    <GridItem character={item.character} pronunciation={item.pronunciation} onClick={handleGridItemClick} />
                                </IonCol>
                            ))}
                        </IonRow>
                    ))
                }
            </IonGrid>
            {selectedCharacter !== null && < ItemScreen
                isOpen={selectedCharacter !== null}
                onClose={handleCloseItem}
                character={selectedCharacter?.character}
                pronunciation={selectedCharacter?.pronunciation}
            />}
        </div>
    );
};

export default Hiragana;