import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Row, Card, ListGroup, Accordion} from "react-bootstrap";
import queryString from 'query-string';
import uniqid from 'uniqid';

import api, {testInterceptor}  from '../api'
import './Login.css'


export default function Login(props) {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [sessions, setSessions] = useState(null);

    useEffect(() => {
        console.log(room)
        getLastThreeSessions()
        console.log(sessions)
        if (Object.keys(queryString.parse(window.location.search)).length === 0) {
            let id = uniqid();
            setRoom(id);
            return;
        } else {

            const { room } = queryString.parse(window.location.search);
            setRoom(room);

        }
      }, []);

    // temporär bis das exports Problem gelöst ist
     const getLastThreeSessions = async () => {

        api.get(`/sessions`)
         .then(res => {
             setSessions(res.data)                               
          return;
        },
        (error) => {
          console.log('Error getting last three sessions');
          console.log(error);
          return;
        }) 
      
      }

    props.setROOM(room);
    return (
    <Container className="align-items-center" style={{width: '100%'}}>
        <Button variant='warning' onClick={testInterceptor}>Testbutton</Button>
        <Card className="card-login mx-auto text-center bg-light">
            <Card.Header className="mx-auto bg-success rounded">
                <h4> Welcome to Chooser </h4>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label className="font-weight-bold">Enter your Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>
                    </Form.Group>

                    <Link onClick={event => (!username || !room) ? event.preventDefault() : null} to={`/lobby?username=${username}&room=${room}`}>
                        <Button type="submit" className="btn-block btn-success">Start Choosing</Button>
                    </Link>
                </Form>
                <Container>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="success" eventKey="0">
                                Was ist Chooser?
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body> Herzlich Willkommen zu Chooser!
                                            Ihr wisst nicht welchen Film ihr anschauen wollt, 
                                            oder was ihr essen sollt? Dann könnt ihr hier ganz leicht zu einer zufriedenstellende Entscheidung kommen
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="success" eventKey="1">
                                Wie funktioniert Chooser?
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>So:</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Container>
            </Card.Body>
        </Card>
        <Row className="align-items-center d-flex flex-row" style={{width: '100%'}}>

        </Row>
    </Container>
    )
}