import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import queryString from 'query-string';
import React from "react";
//import axios from 'axios';
import { Container, Button } from "react-bootstrap";

import Userlist from './Userlist'
import reducer from './reducer';
import Choosing from "../Choosing/choosing";
import Rating from "../Rating/Rating";

import api, {getUsers,  getUser, getCards, getLastThreeSessions, addUser, addSession, addCard} from '../api';



let socket;

// Test
/* const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: false,
}); */

const Lobby = ({ location }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const ENDPOINT = 'http://localhost:4000';

  /*  Schickt GET and an die API/users und gibt ein JSON Array aus.
  *   Wird unten in Zeile 91 in einem Button zum testen abgerufen
  */
    const getUserData = () => {

      api.get('/users')
       .then(res => {                                     //promise

        setUsers(res.data);                                  // update State
      })

    }


  useEffect(() => {
    const { username, room } = queryString.parse(location.search);

    socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

    setUsername(username);
    setRoom(room);

    socket.emit('join', { username, room }, () => {
    });

  }, [ENDPOINT, location.search]);

  addCard("KIEV");
  addCard("Berlin");
  getCards(room);


  // Fängt roomData Event ab und übergibt die User and useState();

  useEffect(() => {
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
}, []);

let data ;//teste noch
  const toTheLobby = (props) =>{//hier werden die Daten von Chosing process empfangen
                                //nun sollen sie hier auch addiert werden und weiter an Rating.jsx angegeben
    dispatch({
      type: 'JOINED',// das switched die Seiten sobald beim choosing alle Filme durch sind
    });
    data = props;
  }
  const [state, dispatch] = React.useReducer(reducer, {// zum Switchen da
    joined: false,
  });

//HTML für die Lobby
  return (
    <div>

      <div className="container float-left">
        <h1 className="align-center">Lobby</h1>
        <ul className="list-group" id="elementList">
          <li class="list-group-item" onClick={addCard(get)}>Element 1</li>
          <li class="list-group-item">Element 2</li>
          <li class="list-group-item">Element 3</li>
        </ul>
      </div>

    <Userlist users={ users }/>

    <Button variant='warning' onClick={getUserData}>Get User Data now!</Button>
    {/*//*/}
    {/*//   {!state.joined ? (// das sollte eig in die App.js gehen, aber erst Mal hier zum Testen*/}
    {/*//       <Choosing toTheLobby={toTheLobby}/>*/}
    {/*//   ) : (*/}
    {/*//       <Rating data={data} />*/}
    {/*//   )}*/}
    </div>
  )
};

export default Lobby;