import React, {useEffect, useState} from "react";
import {ListGroup} from "react-bootstrap";
import './Rating.css';
import api from "../api";

const Rating = (props) => {// Durch props wird sessionid uebergeben

    const [error, setError] = useState('')// zur Fehlerbehandlung
    const [suggestion, setSuggestion] = useState(undefined);// Hier werden die Daten aus DB zum Wiedergabe gespeichert
    const [isLoaded, setIsLoaded] = useState(false); //zur Fehlerbehandlung


    useEffect(() => { //useEffect hook. Hier werden die Daten aus DB abgefragt und in suggestions geadded.
        api.get(`/winners/${props.room}`)//db Abruf
            .then(res => {
                console.log(res.data)
                setSuggestion(res.data);
            }, (error) => {//Fehlerbehandlung
                setIsLoaded(true);
                setError(error);
            })
    }, []);
// JSX File
    return (
        <div className='mainRating'>
            {(suggestion === undefined) ? <h3>Loading...</h3> : <ListGroup>
                <ListGroup.Item>Suggestion {suggestion[0].subject} with {suggestion[0].score} points!</ListGroup.Item>
                <ListGroup.Item>Suggestion {suggestion[1].subject} with {suggestion[1].score} points!</ListGroup.Item>
                <ListGroup.Item>Suggestion {suggestion[2].subject} with {suggestion[2].score} points!</ListGroup.Item>

            </ListGroup>}
        </div>
    )
};

export default Rating;