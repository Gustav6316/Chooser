import { ListGroup, ListGroupItem } from 'react-bootstrap';
import './Login.css'

function Sessionlist(props) {
    console.log(props.sessions);
    console.log(toList(props.sessions));
    return (
        <ListGroup className='Sessions'>
            <h3>Last 3 Sessions</h3>
            {props.sessions ? toList(props.sessions) : <h1>No Sessions</h1>}
        </ListGroup>
    );

}

//  Generiert Listenelemente aus dem übergebenen sessions Array
const toList = (sessions) => (sessions.map((session) =>  <ListGroupItem key={session.sessionid}>Topic: {session.topic}</ListGroupItem>));

export default Sessionlist;

