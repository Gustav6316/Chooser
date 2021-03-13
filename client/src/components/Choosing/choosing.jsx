import React, {useEffect, useState} from "react";
import Item from "./Item/Item"
import "bootstrap/dist/css/bootstrap.css";
import {Col, Container, Row, Button} from "react-bootstrap";
import api, {getCards} from '../api';



const Choosing = (props) => {

    const test = (sessionid) => {
        api.get(`/cards/${sessionid}`)
         .then(res => {
          let cards = res.data;
          console.log(cards);
          return cards
        });
    }

    let data2 = getCards('test');//props.room  - für später

    let data = new Map();
    data.set("Batman", 0).set("Hobbit", 0).set("Matrix", 0).set("Bond", 0);// Diese Daten mussen von DB stammen

    const [count, setCount] = useState(0);

    useEffect(() => {
        // app.post('http://localhost:5000/api/cards')
        //     .then(response => response.json())
        //     .then(data1 => setData1(data1));
    });


    let filmsArray = Array.from(data, ([name]) => ({name}));// Dies wird aber lokal gespeichert
    let currentFilm = filmsArray[count].name;
    let plusPoint = (props1) => {

        data.set(currentFilm, data.get(currentFilm) + props1);
        if (count >= filmsArray.length - 1) {

            return props.toTheLobby(data);
        }//scoreTogether(); wenn alle filme durch sind,
        else setCount(count + 1);       //wird diese F gerufen und sortierte Map in die Rating.jsx zurückgegeben
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


    const showScore = () => {
        return "Movie " + currentFilm + " has now " + data.get(currentFilm) + " point"
    }

// String verkürzt von "String" + Value + "String" auf `String ${value} more String`
    return (
        <Container align-items='center'>

            <Button variant='danger' onClick={test('test')}> Test Function </Button>
            <Row className="justify-content-md-center">

                <Col md="auto">
                    <Item plusPoint={plusPoint} filmToShow={currentFilm}></Item>
                </Col>

            </Row>
            <Row><Col>{`Movie Batman now has ${data.get('Batman')} points`}</Col></Row>
            <Row><Col>{`Movie Hobbit now has ${data.get('Hobbit')} points`}</Col></Row>
            <Row><Col>{`Movie Matrix now has ${data.get('Matrix')} points`}</Col></Row>
            <Row><Col>{`Movie Bond now has ${data.get('Bond')} points`}</Col></Row>
        </Container>

    );
}
export default Choosing;