import React from 'react';

const QuizGridItem = ({ character, onClick, adjHeight = '80px', borderC = '#ffffff'}) => {
    return (
        <div className="grid-item grid-item-quiz" onClick={() => onClick({ character })} style={{ height: adjHeight,borderColor:borderC }}>
            <b>{character}</b>
        </div>
    );
};

export default QuizGridItem;