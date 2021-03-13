import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Row, Card, ListGroup, Accordion} from "react-bootstrap";
import queryString from 'query-string';
import uniqid from 'uniqid';
//import Sessionlist from './Sessions'

import api, {testInterceptor}  from '../api'
import Sessionlist from './Sessionlist'
import './Login.css'

export default function Login() {
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
     function getLastThreeSessions() {

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
                        {(sessions === null) ? <h3>Loading...</h3> : <Sessionlist sessions={sessions}/>}
                </Container>
            </Card.Body>
        </Card>
        <Row className="align-items-center d-flex flex-row" style={{width: '100%'}}>

        </Row>
    </Container>
    )
}