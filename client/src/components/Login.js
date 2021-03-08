import React, {useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from "react-bootstrap";

export default function Login({onSetId}) {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const inputRoom = useRef(null);
    const inputName = useRef(null);

    /*function handleSubmit(e) {
        if (!username || !room) {
            e.preventDefault();
        } else {
            setUsername(inputName.current);
            setRoom(inputRoom.current);
        }

    }*/

    // Wird noch überarbeitet
    return (
        
        <Container className="align-items-center d-flex" style= {{height: '100vh'}}>
            <Form /*onSubmit={handleSubmit}*/ className="w-100">
                <Form.Group>
                    <Form.Label className="font-weight-bold">Enter your Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" ref={inputName} onChange={(event) => setUsername(event.target.value)}/>
                    <Form.Label className="font-weight-bold">Enter Room Name</Form.Label>
                    <Form.Control type="text" placeholder="Room" ref={inputRoom} onChange={(event) => setRoom(event.target.value)}/>
                </Form.Group>

                <Link onClick={event => (!username || !room) ? event.preventDefault() : null} to={`/lobby?username=${username}&room=${room}`}>
                    <Button type="submit" className="btn-block btn-success">Start Choosing</Button>
                </Link>
            </Form>
        </Container>
    )
}