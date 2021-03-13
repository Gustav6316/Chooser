import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button, ListGroup } from "react-bootstrap";
import queryString from 'query-string';
import uniqid from 'uniqid';
//import Sessionlist from './Sessions'

import api from '../api'

export default function Login() {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');

    // temporär bis das exports Problem gelöst ist
    const getLastThreeSessions = () => {

        api.get(`/sessions`)
         .then(res => {                                    
          let sessions = res.data;
          return sessions
        },
        (error) => {
          console.log('Error getting last three sessions');
          console.log(error);
        }) 
      
      }


    useEffect(() => {
        console.log(room)
        if (Object.keys(queryString.parse(window.location.search)).length === 0) {
            let id = uniqid();
            setRoom(id);
            console.log(room)
            return;
        } else {

            const { room } = queryString.parse(window.location.search);
            setRoom(room);

            console.log(room);
        }
      }, []);

    return (
    <Container className="align-items-center" style={{width: '100%'}}>
        <Container className="align-items-center d-flex flex-row" style= {{marginTop: '20vh', height: '20vh'}}>
            <Form /*onSubmit={handleSubmit}*/ className="w-100">
                <Form.Group>
                    <Form.Label className="font-weight-bold">Enter your Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" /* ref={inputName} */ onChange={(event) => setUsername(event.target.value)}/>
                </Form.Group>

                <Link onClick={event => (!username || !room) ? event.preventDefault() : null} to={`/lobby?username=${username}&room=${room}`}>
                    <Button type="submit" className="btn-block btn-success">Start Choosing</Button>
                </Link>
            </Form>
        </Container>
        <Container className="align-items-center d-flex flex-row" style={{width: '100%'}}>

        </Container>
    </Container>
    )
}