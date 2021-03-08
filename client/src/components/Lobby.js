import io from "socket.io-client";

import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import queryString from 'query-string'

import Userlist from './Userlist'

let socket;

const Lobby = ({ location }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const ENDPOINT = 'http://localhost:4000';

  useEffect(() => {
    const { username, room } = queryString.parse(location.search);

    socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

    setUsername(username);
    setRoom(room);

    console.log(location.search);
    console.log(username, room);

    socket.emit('join', { username, room }, () => {
    });

  }, [ENDPOINT, location.search]);


  // Fängt roomData Event ab und übergibt die User and useState();

  useEffect(() => {
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
}, []);

//HTML für die Lobby
  return (
    <div>

      <div className="container float-left">
        <h1 className="align-center">Lobby</h1>
        <ul className="list-group" id="elementList">
          <li class="list-group-item">Element 1</li>
          <li class="list-group-item">Element 2</li>
          <li class="list-group-item">Element 3</li>
        </ul>
      </div>
    
    <Userlist users={ users }/>
    </div>
  )
};

export default Lobby;