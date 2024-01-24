import React, { useState} from 'react';
import SectionDivider from './../components/SectionDivider'
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { n4Kanji, n5Kanji } from '../jsonData/kanjiData';
import GridItem from '../containers/GridItem';
import KanjiItemScreen from '../components/KanjiItemScreen';

const itemsPerRow = 4;

const Kanji = (data) => {
 
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const handleGridItemClick = (character) => {
        var temp;
        if (character.character in n5Kanji) {
            temp = n5Kanji[character.character]
        } else {
            temp = n4Kanji[character.character]

        }
        temp['character'] = character.character;
        temp['level'] = character.level;
        setSelectedCharacter(temp);
    };

    const handleCloseItem = () => {
        setSelectedCharacter(null);
    };

    return (
        <div className="kanji mainSection">
            <h1>Kanji</h1>
            <SectionDivider />
            <h2 style={{color:'white'}}>N5</h2>
            <SectionDivider />
            <IonGrid>
                {data &&
                    data["data"].filter(x => {
                        console.log(x)
                        return x.jlpt === 5
                    }).reduce((rows, item, index) => {
                        if (index % itemsPerRow === 0) {
                            rows.push([]);
                        }
                        rows[rows.length - 1].push(item);
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <IonRow key={rowIndex}>
                            {row.map((item, colIndex) => (
                                <IonCol key={colIndex}>
                                    <GridItem
                                        character={item.character}
                                        level={item.level}
                                        onClick={handleGridItemClick}
                                        pronunciation={""}
                                    />
                                </IonCol>
                            ))}
                        </IonRow>
                    ))
                }
            </IonGrid>
            <h2 style={{ marginTop:'20px' ,color: 'white' }}>N4</h2>
            <SectionDivider />
            <IonGrid style={{ marginBottom: '80px' }} >
                {data &&
                    data["data"].filter(x => x.jlpt === 4).reduce((rows, item, index) => {
                        if (index % itemsPerRow === 0) {
                            rows.push([]);
                        }
                        rows[rows.length - 1].push(item );
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <IonRow key={rowIndex}>
                            {row.map((item, colIndex) => (
                                <IonCol key={colIndex}>
                                    <GridItem
                                        character={item.character}
                                        level={item.level}
                                        onClick={handleGridItemClick}
                                        pronunciation={""}
                                    />
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
                level={selectedCharacter?.level}
                freq={selectedCharacter?.freq}
                meanings={selectedCharacter?.meanings}
                on={selectedCharacter?.readings_on}
                kun={selectedCharacter?.readings_kun}
            />}
        </div>
    );
};

export default Kanji;