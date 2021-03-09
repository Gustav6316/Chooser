import React from "react";
import Item from "./Item/Item"
import {renderEntireTree} from "../../index";
import "bootstrap/dist/css/bootstrap.css";
import {Col, Container, Row} from "react-bootstrap";


let data = new Map();
data.set("Batman", 0).set("Hobbit", 0).set("Matrix", 0).set("Bond", 0);// Diese Daten mussen von DB stammen


let counterFirstItem = 0;// dies auch lokal gespeichert

const Choosing = (props) => {
    let toTheLobby = props.toTheLobby;

    let filmsArray = Array.from(data, ([name]) => ({name}));// Dies wird aber lokal gespeichert
    let currentFilm = filmsArray[counterFirstItem].name;
    let plusPoint = (props) => {

        data.set(currentFilm, data.get(currentFilm) + props);
        renderEntireTree();
        if (counterFirstItem >= filmsArray.length - 1) {
            return toTheLobby(data);
        }//scoreTogether(); wenn alle filme durch sind,
        else counterFirstItem++;       //wird diese F gerufen und sortierte Map in die Rating.jsx zurückgegeben
    };

    const scoreTogether = () => {
        //hier müssen die Scores aller Players addiert werden und als return zurückgegeben werden
        for (let i = 0; i < filmsArray.length; i++) {//array.length
            let film = filmsArray[i];
            // for (){//players.number.length
            //     data.set(film, data.get(film))//
            // }
        }

    }


    const showScore = () => {
        return "Movie " + currentFilm + " has now " + data.get(currentFilm) + " point"
    }

// String verkürzt von "String" + Value + "String" auf `String ${value} more String`
    return (

        <Container align-items='center'>
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