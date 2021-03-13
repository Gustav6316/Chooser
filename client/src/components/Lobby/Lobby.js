import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import queryString from 'query-string';
import React from "react";
import { Container, Button } from "react-bootstrap";
import './Lobby.css'
import Userlist from './Userlist'
import reducer from './reducer';
import Choosing from "../Choosing/choosing";
import Rating from "../Rating/Rating";

import api, {getUsers,  getUser, getCards, getLastThreeSessions, addUser, addSession, addCard} from '../api';



let socket;

const Lobby = ({ location }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const ENDPOINT = 'http://localhost:4000';

  
  /*  Schickt GET and an die API/users und gibt ein JSON Array aus.
  *   Wird unten in Zeile 91 in einem Button zum testen abgerufen
  */
    const getUserData = (test) => { // Wird beim Click auf Get User Data Now! aufgerufen

      api.get('/users')
       .then(res => {                                     //promise
        setUsers(res.data);                               // update State
      })

      getCards('test');     // Gibt JSON Array wieder
      getCards(room);       // Gibt bei Gültiger Sessionid auch ein JSON Array wieder
      //getCards(String)    => Infinite Loop wenn String mit Button übergeben wird
      //                    Lösung: getCards muss über useState Werte bekommen.
    }


  useEffect(() => {
    const { username, room } = queryString.parse(location.search);

    socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

    setUsername(username);
    setRoom(room);

    socket.emit('join', { username, room }, () => {
    });

  }, [ENDPOINT, location.search]);




  // Fängt roomData Event ab und übergibt die User and useState();

  useEffect(() => {
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
}, []);


    const toTheLobby = (props) => {//hier werden die Daten von Chosing process empfangen
        //nun sollen sie hier auch addiert werden und weiter an Rating.jsx angegeben
        dispatch({
            type: 'JOINED',// das switched die Seiten sobald beim choosing alle Filme durch sind
        });
    }

    const [state, dispatch] = React.useReducer(reducer, {// zum Switchen da
        joined: false,
    });
    const addCardBtn = () => {// Add cars button
        let suggestion = document.getElementById('btn1').value;
        if (!suggestion) {
          alert("Please enter some suggestion!");
          return;
        }// wenn das Feld leer ist, wird returned
        addCard({subject: suggestion, description: "test desc", sessionid: 'test'});
    }
//HTML für die Lobby
  return (
    <div>

           <div className="container float-left">
               <h1 className="align-center">Lobby</h1>
               <ul className="list-group" id="elementList">
                   <input id='btn1' class="list-group-item" type='text' placeholder="Write your first Suggestion!"/>
                   <button onClick={addCardBtn} type="submit">Submit</button>
                   <input id='btn1' className="list-group-item" type='text'
                          placeholder="Write your second Suggestion!"/>
                   <button onClick={addCardBtn} type="submit">Submit</button>
                   <input id='btn1' className="list-group-item" type='text'
                          placeholder="Write your third Suggestion!"/>
                   <button onClick={addCardBtn} type="submit">Submit</button>
                </ul>

           </div>

    {<Userlist users={ users }/>}

    {<Button variant='warning' onClick={getUserData}>Get User Data now!</Button>}
{/* 
      {!state.joined ? (// das sollte eig in die App.js gehen, aber erst Mal hier zum Testen
          <Choosing toTheLobby={toTheLobby}/>
      ) : (
          <Rating />
      )} */}
    </div>
  )
};

export default Lobby;