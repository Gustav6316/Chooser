import React, {useEffect, useState} from "react";
import Item from "./Item/Item"
import "bootstrap/dist/css/bootstrap.css";
import {Button, Col, Container, Row} from "react-bootstrap";
import api from '../api';
import {Link} from "react-router-dom";



const Choosing = (props) => {// Durch props wird sessionid uebertragen
    const [count, setCount] = useState(0);//hook fuer counter
    const [error, setError] = useState('')//hook fuer Errorbehandlung
    const [suggestions, setSuggestion] = useState(undefined);// hier werden die Daten aus DB gespeichert
    const [isLoaded, setIsLoaded] = useState(false);// zur Fehlerbehandlung

    // Updated die Scores in DB
    const updateScore = (cardData) => {
        api.patch(`/cards`, cardData)
            .then(res => {
                return res.status;
            });
    }

// Algorithm
    let plusPoint = (props1) => {

        updateScore({
            sessionid: props.room,
            subject: suggestions[count].subject,
            score: props1,
        });

        setCount(count + 1);
    };
    useEffect(() => {

        api.get(`/cards/${props.room}`)// Fragt die Daten aus DB und spreicher in suggestion
            .then(res => {
                    setIsLoaded(true);
                    setSuggestion(res.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                })


    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Container align-items='center'>
                {/*Wird gewartet, bis alles geladen wird und die Seite gerendert*/}
                {(suggestions === undefined) ? <h3>Loading...</h3> : <Row className="justify-content-md-center">

                    <Col md="auto">

                        {!(count >= suggestions.length) ?
                            <Item id='itemId' plusPoint={plusPoint} filmToShow={suggestions[count].subject}/> :
                            <Link to={`/results`}><Button type="submit" className="btn-block btn-success">Show
                                results</Button></Link>}

                    </Col>

                </Row>}

            </Container>

        );

    };

}
export default Choosing;