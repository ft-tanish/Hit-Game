import React, { useState, useEffect } from 'react';

const keywords = ['apple', 'banana', 'cherry', 'orange', 'pear', 'pineapple', 'watermelon', 'grape', 'kiwi'];

const Game = () => {
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(60);
    const [keywordBox, setKeywordBox] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomBox = Math.floor(Math.random() * 9);
            const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
            setKeywordBox(randomBox);
            setTimeout(() => {
                setKeywordBox(null);
            }, 1000);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleClick = (event) => {
        if (event.target.id === `box-${keywordBox}`) {
            setScore(score + 5);
        } else {
            setScore(score - 2.5);
        }
    };

    const startGame = () => {
        setScore(0);
        setTimer(60);
        const countdownId = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        setTimeout(() => clearInterval(countdownId), 60000);
    };

    const boxes = [];
    for (let i = 0; i < 9; i++) {
        boxes.push(
            <div
                key={i}
                id={`box-${i}`}
                className="box"
                onClick={handleClick}
                style={{ background: keywordBox === i ? 'yellow' : 'white' }}
            >
                {keywordBox === i ? keywords[Math.floor(Math.random() * keywords.length)] : ''}
            </div>
        );
    }

    return (
        <div>
            <div className="grid-container">{boxes}</div>
            <div>Score: {score}</div>
            <div>Time remaining: {timer}</div>
            <button onClick={startGame}>Start</button>
        </div>
    );
};

export default Game;
