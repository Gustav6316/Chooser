import { ListGroup, ThemeProvider } from 'react-bootstrap';

const Sessionlist = ({sessions}) => {
<ListGroup>
    <h3>Last 3 Sessions</h3>
    {toList(sessions)}
</ListGroup>
}

//  Generiert Listenelemente aus dem übergebenen sessions Array
const toList = (sessions) => (sessions.map((session) =>  <li key={session.sessionid}>Topic: {session.topic}</li>));

export default Sessionlist;

