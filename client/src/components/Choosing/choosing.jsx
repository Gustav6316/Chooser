import React, {useState} from "react";
import Item from "./Item/Item"
import "bootstrap/dist/css/bootstrap.css";
import {Col, Container, Row} from "react-bootstrap";
import api from '../api';


const Choosing = (props) => {
    const [count, setCount] = useState(0);

    let filmsArray = [];
    let endFilms = {};
    let currentFilm = '';
    const test = () => {
        api.get(`/cards/${'test'}`)
            .then(res => {
                let cards = res.data;

                for (let i = 0; i < cards.length; i++) {
                    filmsArray[i] = cards[i].subject;
                    endFilms[i] = cards[i];
                }
            });
        //currentFilm = endFilms[count].subject;

    }

    test();




    let plusPoint = (props1) => {

        endFilms[count].score += props1;
        if (count >= filmsArray.length - 1) {

            return props.toTheLobby(endFilms);
        } else setCount(count + 1);       //wird diese F gerufen und sortierte Map in die Rating.jsx zurückgegeben
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
                    <Item plusPoint={plusPoint} filmToShow={currentFilm}></Item>
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