import React, {useEffect, useState} from "react";
import Item from "./Item/Item"
import "bootstrap/dist/css/bootstrap.css";
import {Col, Container, Row} from "react-bootstrap";
import api from '../api';


const Choosing = (props) => {
    const [count, setCount] = useState(0);
    const [error, setError] = useState('')
    const [fullFilms, setFullFilms] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);

    // const test = () => {
    //     isTestAlreadyDid = true;
    //     api.get(`/cards/${props.room}`)
    //         .then(res => {
    //             let cards = res.data;
    //             console.log(cards)
    //             setCount(cards.length);
    //
    //
    //         });
    // }
    //
    //
    // if(!isTestAlreadyDid) test();
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

        if (count >= fullFilms.length - 1) {

            return props.toTheLobby();
        } else setCount(count + 1);       //wird diese F gerufen und sortierte Map in die Rating.jsx zurückgegeben
    };
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal

        api.get(`/cards/${props.room}`, {signal: signal})
            .then(res => {
                    setIsLoaded(true);
                    setFullFilms(res.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                })
        return function cleanup() {
            abortController.abort();
        }

    }, [])
    useEffect(() => () => console.log("unmount"), []);

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //     return <div>Loading...</div>;
    // } else {
    return (
        <Container align-items='center'>


            <Row className="justify-content-md-center">

                <Col md="auto">

                    <Item plusPoint={plusPoint} filmToShow={fullFilms[count].subject}></Item>//hier hat alles funktioniert!Jetzt aber cannot rad property of undefined
                </Col>

            </Row>
            <Row><Col>{`Movie Batman now has ${fullFilms[0].score}points`}</Col></Row>
            {/*<Row><Col>{`Movie Batman now has ${endFilms[1].score} points`}</Col></Row>*/}
            {/*<Row><Col>{`Movie Batman now has ${endFilms[2].score} points`}</Col></Row>*/}
            {/*<Row><Col>{`Movie Batman now has ${endFilms[3].score} points`}</Col></Row>*/}

        </Container>

    );
    // }
}
export default Choosing;