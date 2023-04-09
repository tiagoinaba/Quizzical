import React from "react";

export default function Start(props) {
    return (
        <section className="start">
            <h1 className="start__heading">Quizzical</h1>
            <p className="start__description">Some description if needed</p>
            <button className="btn start__btn" onClick={props.btnFunc}>Start quiz</button>
        </section>
    )
}