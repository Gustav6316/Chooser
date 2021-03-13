import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { getWinner } from "../api";
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
function getSubject(sessionid) {

    console.log(getWinner(sessionid))
    let winner = getWinner(sessionid);

    console.log(`Hier ist er: ${winner} ID: ${sessionid}`)

    if (winner === undefined) return 'no winner'
    
    return winner.subject;
}
const toList = (sessions) => (sessions.map((session) =>  <ListGroupItem key={session.sessionid}>Topic: {session.topic} <br/> Winner: {getSubject(session.sessionid)} </ListGroupItem>));

export default Sessionlist;

