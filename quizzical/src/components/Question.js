import React from "react";
import { decode } from "he"

export default function Question(props) {


    const answerElements = props.answers.map(answer => {
        return <button 
            key={answer.id} 

            className={`question__alternative 
            ${!props.checkAnswer && answer.isSelected ? 'question__alternative--selected' : ''} 
            ${props.checkAnswer && answer.isSelected && answer.isCorrect ? 'question__alternative--correct' : props.checkAnswer && answer.isSelected && !answer.isCorrect ? 'question__alternative--incorrect' : ''}
            ${props.checkAnswer && !answer.isSelected && answer.isCorrect && 'question__alternative--correct'}
            ${props.checkAnswer && !answer.isCorrect ? 'transparent' : ''}`} 

            id={answer.id} 
            onClick={() => props.handleClick(props.id, answer.id)}
        >
            {answer.option}
        </button>
    })


    return (
        <div className="question">
            <h3 className="question__heading">{decode(props.question)}</h3>
            
            {answerElements}
            <hr />
        </div>
    )
}