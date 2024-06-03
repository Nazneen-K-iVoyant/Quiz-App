import React, { useState, useRef } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
    const [index, setIndex] = useState(0); // Start from the first question
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const Option1 = useRef<HTMLLIElement>(null);
    const Option2 = useRef<HTMLLIElement>(null);
    const Option3 = useRef<HTMLLIElement>(null);
    const Option4 = useRef<HTMLLIElement>(null);

    const optionArray = [Option1, Option2, Option3, Option4];

    const checkAns = (e: React.MouseEvent<HTMLLIElement>, ans: number) => {
        if (!lock) {
            if (data[index].ans === ans) {
                e.currentTarget.classList.add("correct");
                setScore((prev) => prev + 1);
            } else {
                e.currentTarget.classList.add("wrong");
                const correctOption = optionArray[data[index].ans - 1].current;
                if (correctOption) {
                    correctOption.classList.add("correct");
                }
            }
            setLock(true);
        }
    };

    const nextQuestion = () => {
        if (lock) {
            if (index < data.length - 1) {
                setIndex((prevIndex) => prevIndex + 1);
                setLock(false);
                optionArray.forEach((option) => {
                    if (option.current) {
                        option.current.classList.remove("correct", "wrong");
                    }
                });
            } else {
                setShowResult(true);
            }
        }
    };

    const reset = () => {
        setIndex(0);
        setScore(0);
        setLock(false);
        setShowResult(false);
        optionArray.forEach((option) => {
            if (option.current) {
                option.current.classList.remove("correct", "wrong");
            }
        });
    };

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            {showResult ? (
                <div className="result">
                    <h2>Quiz Completed</h2>
                    <p>Your Score: {score} out of {data.length}</p>
                    <button onClick={reset}>Restart Quiz</button>
                </div>
            ) : (
                <>
                    <h2>{index + 1}. {data[index].question}</h2>
                    <ul>
                        <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{data[index].option1}</li>
                        <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{data[index].option2}</li>
                        <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{data[index].option3}</li>
                        <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{data[index].option4}</li>
                    </ul>
                    <button onClick={nextQuestion}>Next</button>
                </>
            )}
            <div className="index">{index + 1} of {data.length} Questions</div>
            <div className="score">Score: {score}</div>
        </div>
    );
};

export default Quiz;
