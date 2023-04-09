import React from "react";
import Question from "./Question";
import { decode } from "he";
import { nanoid } from 'nanoid'

export default function Quiz(props) {
    const [questions, setQuestions] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [checkAnswer, setCheckAnswer] = React.useState(false)

    React.useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        fetch('https://opentdb.com/api.php?amount=5')
          .then(res => res.json())
          .then(data => {
            setQuestions(data.results.map(item => {
                const answers = [...item.incorrect_answers, item.correct_answer].sort()
                const correctAnswer = item.correct_answer

                const answerObject = answers.map(answer => {
                    return { 
                        option: decode(answer),
                        id: nanoid(),
                        isCorrect: answer === correctAnswer,
                        isSelected: false
                    }
                })
                return {
                    question: decode(item.question),
                    answers: answerObject,
                    id: nanoid()
                }
            }))
        })
    }

    function selectAlternative(questionId, answerId) {
        console.log(questionId, answerId)
        setQuestions(oldQuestions => {
            return oldQuestions.map(item => {
                if(item.id === questionId) {
                    return {...item, answers: item.answers.map(answer => {
                        if(answer.id === answerId) {
                            return {
                                ...answer,
                                isSelected: !answer.isSelected
                            }
                        } else {
                            return {
                                ...answer,
                                isSelected: false
                            }
                        }
                    })}
                } else {
                    return item
                }
            })
        })
    }

    function playAgain() {
        setCheckAnswer(false)
        setScore(0)
        fetchData()
    }

    function handleCheck() {
        if(!checkAnswer) {
            questions.map(question => {
                question.answers.map(option => {
                    if(option.isCorrect && option.isSelected) {
                        setScore(oldScore => oldScore + 1)
                    }
                })
            })
        }
        setCheckAnswer(true)
    }

    const questionElements = questions.map(item => {
        return (<Question 
            key={item.id} 
            id={item.id} 
            question={item.question} 
            answers={item.answers}
            handleClick={selectAlternative}
            checkAnswer={checkAnswer}
            />)
    })

    return (
        <main className="quiz">
            {questionElements}
            <div className="bottom-container">
                {checkAnswer && <h3 className="score">You scored {score}/5 correct answers</h3>}
                {checkAnswer ? <button className="btn check-btn" onClick={playAgain}>Play again</button> : <button className="btn check-btn" onClick={handleCheck}>Check answers</button>}
            </div>
        </main>
    )
}