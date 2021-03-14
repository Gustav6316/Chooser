import React, {useEffect, useState} from "react";
import Item from "./Item/Item"
import "bootstrap/dist/css/bootstrap.css";
import {Button, Col, Container, Row} from "react-bootstrap";
import api from '../api';
import {Link} from "react-router-dom";


const Choosing = (props) => {
    const [count, setCount] = useState(0);
    const [error, setError] = useState('')
    const [fullFilms, setFullFilms] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const updateScore = (cardData) => {
        api.patch(`/cards`, cardData)
            .then(res => {
                return res.status;
            });
    }

    let plusPoint = (props1) => {

        updateScore({
            sessionid: props.room,
            subject: fullFilms[count].subject,
            score: props1,
        });

        // if (count >= fullFilms.length - 1) {
        //
        //     return disableItem();
        //
        // } else
        setCount(count + 1);       //wird diese F gerufen und sortierte Map in die Result.jsx zurückgegeben
    };
    useEffect(() => {
        api.get(`/cards/${props.room}`)
            .then(res => {
                    setIsLoaded(true);
                    setFullFilms(res.data);
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


            {(fullFilms === undefined) ? <h3>Loading...</h3>:  <Row className="justify-content-md-center">

                <Col md="auto">

                    {!(count >= fullFilms.length ) ? <Item id='itemId' plusPoint={plusPoint} filmToShow={fullFilms[count].subject}/>: <Link  to={`/results`}><Button type="submit" className="btn-block btn-success">Show results</Button></Link>}

                </Col>

            </Row>}

        </Container>

    );

    };

}
export default Choosing;