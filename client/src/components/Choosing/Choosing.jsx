import React, {useState} from "react";
import Item from "./Item/Item"
import "bootstrap/dist/css/bootstrap.css";
import {Col, Container, Row} from "react-bootstrap";
import api  from '../api';



const Choosing = (props) => {
    const [count, setCount] = useState(0);
    const [filmsArray, setFilmsArray] = useState('')
    const [fullFilms, setFullFilms] = useState('')
    let isTestAlreadyDid = false;
   //  let filmsArray =[];
   //  let fullFilms = {};
     let currentFilm = '';
    const test = () => {
        isTestAlreadyDid = true;
        api.get(`/cards/${props.room}`)
            .then(res => {
                let cards = res.data;
                setCount(cards.length);

            });

    console.log(count);
    }


    if(!isTestAlreadyDid) test();
    console.log(fullFilms);// console.log:
    // 0: {cardid: 5, subject: "Movie 4", description: "Another Description", sessionid: "test", score: 6}
    // 1: {cardid: 18, subject: "com oncc", description: "test desc", sessionid: "test", score: 0}
    // 2: {cardid: 19, subject: "another film", description: "test desc", sessionid: "test", score: 0}
    // __proto__: Object

    console.log(fullFilms.subject);//  undefined и также если через fullFilms[0] обраащаться

    currentFilm = 'endFilms';


    const updateScore = (cardData) => {
        api.patch(`/sessions`, cardData)
            .then(res => {
                return res.status;
            });
    }
    updateScore({
        sessionid:'test',
        subject: 'mvs1',
        score:5});


    let plusPoint = (props1) => {

        updateScore({
            sessionid:'test',
            subject: 'Movie 4',
            score:5});

        if (count <= 0) {

            return props.toTheLobby();
        } else setCount(count -1);       //wird diese F gerufen und sortierte Map in die Rating.jsx zurückgegeben
    };

    // const scoreTogether = () => {
    //     //hier müssen die Scores aller Players addiert werden und als return zurückgegeben werden
    //     for (let i = 0; i < filmsArray.length; i++) {//array.length
    //         let film = filmsArray[i];
    //         // for (){//players.number.length
    //         //     data.set(film, data.get(film))//
    //         // }
    //     }
    //
    // }

// String verkürzt von "String" + Value + "String" auf `String ${value} more String`
    return (
        <Container align-items='center'>


            <Row className="justify-content-md-center">

                <Col md="auto">
                    <Item plusPoint ={plusPoint} filmToShow={currentFilm}></Item>
                </Col>

            </Row>
            {/*<Row><Col>{`Movie Batman now has ${endFilms[0].score} points`}</Col></Row>*/}
            {/*<Row><Col>{`Movie Batman now has ${endFilms[1].score} points`}</Col></Row>*/}
            {/*<Row><Col>{`Movie Batman now has ${endFilms[2].score} points`}</Col></Row>*/}
            {/*<Row><Col>{`Movie Batman now has ${endFilms[3].score} points`}</Col></Row>*/}

        </Container>

    );
}
export default Choosing;