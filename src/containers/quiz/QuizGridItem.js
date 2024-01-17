import React from 'react';

const QuizGridItem = ({ character, onClick }) => {
    return (
        <div className="grid-item grid-item-quiz" onClick={() => onClick({ character })}>
            <br></br>
            <b>{character}</b>
            <br></br>
        </div>
    );
};

export default QuizGridItem;