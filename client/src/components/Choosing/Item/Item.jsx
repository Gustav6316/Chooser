import React from "react";
import {Button, ButtonGroup, Card} from "react-bootstrap";

let test = 0;
const Item = (props) => {
    let elValue = React.createRef();
    let answerYes = () => {

        props.plusPoint(2);
    }
    let answerMid = () => {

        props.plusPoint(1);
    }
    let answerNo = () => {

        props.plusPoint(0);
    }
    return (
        <div>

            <Card style={{height: '14rem', width: '14rem'}}>
                {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
                <Card.Body>
                    <Card.Title>{props.filmToShow}</Card.Title>
                    <Card.Text>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    <ButtonGroup aria-label="Basic example">
                        <Button id ='id' onClick={answerNo} variant="secondary">No</Button>
                        <Button id ='id' onClick={answerMid} variant="secondary">50/50</Button>
                        <Button id ='id' onClick={answerYes} variant="secondary">Yes</Button>
                    </ButtonGroup>
                </Card.Footer>
            </Card>
            {/*<div>*/}
            {/*    <div id="test">{props.filmToShow}</div>*/}
            {/*    <button onClick={addPoint}>Vote for this</button>*/}
            {/*</div>*/}


        </div>
    )
}
export default Item;