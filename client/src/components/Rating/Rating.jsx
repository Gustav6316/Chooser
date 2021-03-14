import React from "react";
import {ListGroup} from "react-bootstrap";
import './Rating.css';


const Rating = (props) => {

console.log(props.room);
    return(
        <div className='mainRating'>
            <ListGroup>
                <ListGroup.Item>{props.room}</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>

            </ListGroup>
        </div>
    )
};

export default Rating;